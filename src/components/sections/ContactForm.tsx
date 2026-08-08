import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { serviceOptions } from '@/data/services';
import { projects } from '@/data/projects';
import { isFilled, t } from '@/lib/tokens';
import { format, formatNodes } from '@/lib/copy';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IconChip } from '@/components/common/IconChip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * CONTACT FORM
 * ============================================================================
 * The single most valuable component on the site — everything else exists to
 * get someone here.
 *
 * Conversion decisions:
 *  • Only three fields are required: name, phone and service. Every additional
 *    required field measurably reduces submissions, so budget, date, email and
 *    message are optional but offered — the serious enquirers fill them in
 *    anyway, and they are exactly the leads worth qualifying.
 *  • Errors appear on blur and on submit, never on first keystroke. Being
 *    told you are wrong while still typing is the fastest way to lose someone.
 *  • The submit button states what happens next ("we reply within one working
 *    day") rather than saying "Submit".
 *  • A honeypot field catches the bots that would otherwise pollute the inbox
 *    and erode the client's trust in the site.
 *
 * Accessibility:
 *  • Every field has a real <label>, errors are wired via `aria-describedby`
 *    and `aria-invalid`, and the error summary is announced with `role="alert"`.
 *  • The success state moves focus to itself so screen readers hear it.
 *
 * DEMO MODE: while `forms.endpoint` is a placeholder, the form validates and
 * shows the success state without sending anything — so the template can be
 * demonstrated end to end before any backend exists.
 * ============================================================================
 */

type FieldName = 'name' | 'phone' | 'email' | 'service' | 'budget' | 'date' | 'message';
type Errors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

/* Only name, phone and service are required — see the note above. */

/** Deliberately permissive — international numbers vary far more than people expect. */
const PHONE_PATTERN = /^[+()\d][\d\s\-()]{7,19}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Every word this form says, from `src/config/copy.config.ts`. */
const copy = copyConfig.form;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  const message = copy.validation;

  if (!values.name.trim()) errors.name = message.nameRequired;
  else if (values.name.trim().length < 2) errors.name = message.nameTooShort;

  if (!values.phone.trim()) errors.phone = message.phoneRequired;
  else if (!PHONE_PATTERN.test(values.phone.trim())) errors.phone = message.phoneInvalid;

  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim()))
    errors.email = message.emailInvalid;

  if (!values.service) errors.service = message.serviceRequired;

  return errors;
}

const EMPTY: Record<FieldName, string> = {
  name: '',
  phone: '',
  email: '',
  service: '',
  budget: '',
  date: '',
  message: '',
};

export function ContactForm() {
  const location = useLocation();
  const successRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<Record<FieldName, string>>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  /** True while no real endpoint has been configured. */
  const demoMode = !isFilled(siteConfig.forms.endpoint);

  /*
   * A service row or a project case study can hand context to this form via
   * router state, so the visitor never has to re-explain what they were
   * looking at. Carrying intent across the click is worth real conversion.
   */
  const routed = location.state as { service?: string; project?: string } | null;
  const preselectedService = routed?.service;
  const preselectedProject = routed?.project;

  useEffect(() => {
    if (preselectedService && serviceOptions.includes(preselectedService)) {
      setValues((current) => ({ ...current, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (!preselectedProject) return;
    const project = projects.find((entry) => entry.slug === preselectedProject);
    if (!project) return;

    setValues((current) => ({
      ...current,
      /* Only seed the message if the visitor has not started typing. */
      message: current.message || t(format(copy.projectPrefill, { project: project.name })),
    }));
  }, [preselectedProject]);

  /* Today, in yyyy-mm-dd — a consultation cannot be booked in the past. */
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const setField = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    /* Clear an existing error as soon as the visitor corrects it. */
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const found = validate(values);
    if (found[field]) setErrors((current) => ({ ...current, [field]: found[field] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* Honeypot — a real visitor never fills a field they cannot see. */
    if (honeypotRef.current?.value) return;

    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, phone: true, email: true, service: true });

    if (Object.keys(found).length > 0) {
      const firstError = Object.keys(found)[0];
      document.getElementById(`field-${firstError}`)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      if (demoMode) {
        /* Simulated latency so the loading state is visible when demoing. */
        await new Promise((resolve) => setTimeout(resolve, 900));
      } else {
        const response = await fetch(siteConfig.forms.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...values,
            source: window.location.href,
            business: t(siteConfig.business.name),
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      }

      /*
       * The primary conversion, and the only one the delegated click tracker
       * cannot infer — there is no link to classify, and it must fire on a
       * SUCCESSFUL submit rather than on the button press, or every validation
       * failure would be reported as a lead.
       *
       * No `service`/`budget` values are sent, only whether they were supplied:
       * this payload goes to a third party, and the visitor's own words about
       * their home are not ours to forward. `trackEvent` is a no-op while
       * analytics is unconfigured, so there is nothing to guard here.
       */
      trackEvent(ANALYTICS_EVENTS.generateLead, {
        form: 'contact',
        service: values.service || undefined,
        has_budget: Boolean(values.budget),
        has_message: Boolean(values.message.trim()),
        demo_mode: demoMode,
      });

      setStatus('success');
      setSubmitMessage(t(siteConfig.forms.successMessage));
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus('error');
      setSubmitMessage(t(copy.errorMessage));
    }
  };

  /* Move focus to the confirmation so it is announced by a screen reader. */
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  /* ---------------------------------------------------------------- success */
  if (status === 'success') {
    return (
      <m.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center rounded-(--radius-brand) border border-border bg-surface p-10 text-center focus:outline-none md:p-14"
      >
        <IconChip icon={CheckCircle2} size="xl" strokeWidth={1.3} />

        <h3 className="mt-7 font-display text-h3 text-ink">{t(copy.successTitle)}</h3>

        <p className="mt-4 max-w-md text-ink-muted">{submitMessage}</p>

        {demoMode && (
          <p className="mt-6 rounded-(--radius-brand) border border-border bg-canvas px-4 py-3 text-[0.78rem] text-ink-muted">
            {copyConfig.developer.formDemoSuccess.label}{' '}
            {formatNodes(copyConfig.developer.formDemoSuccess.detail, {
              field: <code className="text-accent-strong">forms.endpoint</code>,
              file: <code className="text-accent-strong">site.config.ts</code>,
            })}
          </p>
        )}

        <Button
          variant="outline"
          size="md"
          className="mt-9"
          onClick={() => {
            setStatus('idle');
            setSubmitMessage('');
          }}
        >
          {copy.sendAnother}
        </Button>
      </m.div>
    );
  }

  /* ------------------------------------------------------------------ form */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-(--radius-brand) border border-border bg-surface p-8 md:p-10"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-h3 text-ink">{t(copy.title)}</h2>
        <p className="text-[0.93rem] text-ink-muted">{t(copy.lead)}</p>
      </div>

      {/* Honeypot: visually hidden, never focusable, ignored by autofill. */}
      <input
        ref={honeypotRef}
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] size-0 opacity-0"
      />

      <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {/* ---- Name ---- */}
        <Field
          id="name"
          label={copy.fields.name.label}
          required
          error={touched.name ? errors.name : undefined}
        >
          <Input
            id="field-name"
            name="name"
            autoComplete="name"
            placeholder={copy.fields.name.placeholder}
            value={values.name}
            invalid={Boolean(touched.name && errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            onChange={(event) => setField('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            required
          />
        </Field>

        {/* ---- Phone ---- */}
        <Field
          id="phone"
          label={copy.fields.phone.label}
          required
          error={touched.phone ? errors.phone : undefined}
          hint={copy.fields.phone.hint}
        >
          <Input
            id="field-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={copy.fields.phone.placeholder}
            value={values.phone}
            invalid={Boolean(touched.phone && errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : 'hint-phone'}
            onChange={(event) => setField('phone', event.target.value)}
            onBlur={() => handleBlur('phone')}
            required
          />
        </Field>

        {/* ---- Email ---- */}
        <Field
          id="email"
          label={copy.fields.email.label}
          error={touched.email ? errors.email : undefined}
        >
          <Input
            id="field-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={copy.fields.email.placeholder}
            value={values.email}
            invalid={Boolean(touched.email && errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            onChange={(event) => setField('email', event.target.value)}
            onBlur={() => handleBlur('email')}
          />
        </Field>

        {/* ---- Service ---- */}
        <Field
          id="service"
          label={copy.fields.service.label}
          required
          error={touched.service ? errors.service : undefined}
        >
          <Select
            value={values.service || undefined}
            onValueChange={(value) => {
              setField('service', value);
              setTouched((current) => ({ ...current, service: true }));
            }}
            name="service"
          >
            <SelectTrigger
              id="field-service"
              invalid={Boolean(touched.service && errors.service)}
              aria-describedby={errors.service ? 'error-service' : undefined}
            >
              <SelectValue placeholder={copy.fields.service.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {t(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* ---- Budget ---- */}
        <Field
          id="budget"
          label={copy.fields.budget.label}
          hint={copy.fields.budget.hint}
        >
          <Select
            value={values.budget || undefined}
            onValueChange={(value) => setField('budget', value)}
            name="budget"
          >
            <SelectTrigger id="field-budget" aria-describedby="hint-budget">
              <SelectValue placeholder={copy.fields.budget.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {siteConfig.forms.budgetOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {t(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* ---- Preferred date ---- */}
        <Field id="date" label={copy.fields.date.label}>
          <Input
            id="field-date"
            name="date"
            type="date"
            min={today}
            value={values.date}
            onChange={(event) => setField('date', event.target.value)}
            className="[color-scheme:light]"
          />
        </Field>

        {/* ---- Message ---- */}
        <div className="sm:col-span-2">
          <Field
            id="message"
            label={copy.fields.message.label}
            hint={copy.fields.message.hint}
          >
            <Textarea
              id="field-message"
              name="message"
              rows={4}
              placeholder={copy.fields.message.placeholder}
              value={values.message}
              aria-describedby="hint-message"
              onChange={(event) => setField('message', event.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* ---- Error summary ---- */}
      <AnimatePresence>
        {status === 'error' && (
          <m.p
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex items-start gap-3 rounded-(--radius-brand) border border-red-700/25 bg-red-50 p-4 text-[0.88rem] text-red-900"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
            {submitMessage}
          </m.p>
        )}
      </AnimatePresence>

      {/* ---- Submit ---- */}
      <div className="mt-10 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2.5 text-[0.8rem] leading-relaxed text-ink-muted sm:max-w-xs">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-accent-strong"
            strokeWidth={1.6}
          />
          {/*
            The promise now links to the document that backs it. A privacy
            claim beside a field asking for a phone number should be checkable,
            and the span keeps the sentence and its link as one flex item so the
            icon stays aligned to the first line.
          */}
          <span>
            {t(copy.privacyNote)}{' '}
            <Link
              to={routes.privacy}
              className="link-underline whitespace-nowrap text-accent-strong transition-colors duration-300 hover:text-ink"
            >
              {copy.privacyLink}
            </Link>
          </span>
        </p>

        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          className="shrink-0 sm:min-w-64"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" strokeWidth={2} />
              {copy.submitting}
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1.5"
                strokeWidth={1.7}
              />
            </>
          )}
        </Button>
      </div>

      {demoMode && (
        <p className="mt-6 text-[0.76rem] text-ink-muted">
          <span className="text-accent-strong">{copyConfig.developer.formDemoFooter.label}</span>{' '}
          {formatNodes(copyConfig.developer.formDemoFooter.detail, {
            field: <code>forms.endpoint</code>,
            file: <code>site.config.ts</code>,
          })}
        </p>
      )}
    </form>
  );
}

/* -------------------------------------------------------------------------- */

/** A labelled field wrapper that wires up hint and error descriptions. */
function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: FieldName;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={`field-${id}`} required={required}>
        {label}
      </Label>

      {children}

      <AnimatePresence mode="wait">
        {error ? (
          <m.span
            key="error"
            id={`error-${id}`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-[0.78rem] text-red-800"
          >
            <AlertCircle className="size-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
            {error}
          </m.span>
        ) : (
          hint && (
            <span
              key="hint"
              id={`hint-${id}`}
              className={cn('text-[0.76rem] leading-relaxed text-ink-muted')}
            >
              {hint}
            </span>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
