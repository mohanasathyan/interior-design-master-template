import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, MessageSquare, Phone, Quote, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { clientReasons, founder, milestones, mission, story, values, vision } from '@/data/about';
import { qualityStandards } from '@/data/philosophy';
import { studioStats } from '@/data/stats';
import { breadcrumbSchema, webPageSchema, type Crumb } from '@/lib/schema';
import { telLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { Seo } from '@/components/common/Seo';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem, RevealRule } from '@/components/common/Reveal';
import { Img } from '@/components/common/Img';
import { FeatureCard } from '@/components/common/FeatureCard';
import { IconChip } from '@/components/common/IconChip';
import { Stat } from '@/components/common/Stat';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/sections/PageHero';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCta } from '@/components/sections/FinalCta';

/**
 * ============================================================================
 * ABOUT
 * ============================================================================
 * The trust page. A visitor lands here after the portfolio has convinced them
 * of the work and they now want to know who they would be handing their home
 * to for three months.
 *
 * It is written in the first person where a person is speaking (the founder's
 * letter) and in the third person where the studio is. That distinction is
 * small but it is what stops an About page reading like a brochure.
 * ============================================================================
 */
const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export default function About() {
  const page = siteConfig.seo.pages.about;
  const call = telLink();

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={page.path}
        schemas={[
          webPageSchema(page.title, page.description, page.path),
          breadcrumbSchema(CRUMBS),
        ]}
      />

      <PageHero
        eyebrow="About the Studio"
        title="The people who will be looking after your home."
        lead="We are a design and execution studio in {{CITY}} — designers, project managers and craftspeople under one roof, accountable for the whole journey from first sketch to final handover."
        image={siteConfig.media.pageHeaders.about}
        crumbs={CRUMBS}
        assurances={[
          { icon: MessageSquare, text: 'Free consultation and site visit' },
          { icon: ShieldCheck, text: 'No obligation, no pressure' },
          { icon: Clock, text: 'A reply within one working day' },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/contact">{siteConfig.cta.primary}</Link>
          </Button>
          <Button asChild size="lg" variant="outlineInk">
            <a href={call.href}>
              <Phone className="size-4" strokeWidth={1.7} />
              {t(siteConfig.contact.phone)}
            </a>
          </Button>
        </div>
      </PageHero>

      {/* ================= Story ================= */}
      <Section tone="canvas" spacing="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal preset="tight">
              <span className="eyebrow">{story.eyebrow}</span>
            </Reveal>

            <Reveal preset="up" delay={0.06}>
              <h2 className="mt-5 font-display text-h2 text-ink">{t(story.title)}</h2>
            </Reveal>

            <div className="mt-8 flex flex-col gap-6">
              {story.paragraphs.map((paragraph, index) => (
                <Reveal key={index} preset="up" delay={0.1 + index * 0.05}>
                  <p className="text-[1.02rem] leading-relaxed text-ink-muted">{t(paragraph)}</p>
                </Reveal>
              ))}
            </div>

            <Reveal preset="up" delay={0.28}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="md">
                  <Link to="/projects">See Our Work</Link>
                </Button>
                <Button asChild size="md" variant="outline">
                  <Link to="/services">What We Offer</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---- Image pairing ---- */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-5">
              <Reveal preset="image" className="col-span-3">
                <Img
                  image={siteConfig.media.aboutPrimary}
                  ratio="aspect-[4/5]"
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="rounded-(--radius-brand)"
                />
              </Reveal>

              <div className="col-span-2 flex flex-col justify-end gap-5">
                <Reveal preset="image" delay={0.15}>
                  <Img
                    image={siteConfig.media.aboutSecondary}
                    ratio="aspect-[3/4]"
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="rounded-(--radius-brand)"
                  />
                </Reveal>

                <Reveal preset="up" delay={0.25}>
                  <div className="rounded-(--radius-brand) border border-border bg-surface p-6">
                    <Stat
                      value={studioStats[0].value}
                      suffix={studioStats[0].suffix}
                      label={studioStats[0].label}
                      size="sm"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= Mission & Vision ================= */}
      <Section tone="muted" spacing="lg">
        <RevealGroup stagger={0.1} className="grid gap-px bg-border md:grid-cols-2">
          {[mission, vision].map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem
                key={item.label}
                as="article"
                className="group bg-surface-muted p-10 transition-colors duration-500 hover:bg-surface md:p-14"
              >
                <IconChip
                  icon={Icon}
                  size="md"
                  tone="outline"
                  className="group-hover:bg-accent-button group-hover:text-accent-contrast"
                />

                <h2 className="mt-7 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent-strong">
                  {item.label}
                </h2>

                <p className="mt-5 font-display text-2xl leading-snug text-ink md:text-[1.7rem]">
                  {t(item.statement)}
                </p>

                <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-muted">
                  {t(item.detail)}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ================= Values ================= */}
      <Section tone="canvas" spacing="lg" backdrop={siteConfig.media.backdrops.soft}>
        <SectionHeading
          eyebrow="Our Values"
          title="Four things we will not trade away."
          lead="Values are only meaningful when they cost something. Each of these has, at some point, cost us a project — and we would make the same call again."
          align="center"
          maxWidth="max-w-2xl"
        />

        <RevealGroup stagger={0.08} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <FeatureCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
              index={index}
            />
          ))}
        </RevealGroup>
      </Section>

      {/* ================= Founder ================= */}
      <Section tone="surface" spacing="lg" id="founder">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal preset="image" className="lg:col-span-5">
            <div className="relative">
              <Img
                image={siteConfig.media.founder}
                ratio="aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="rounded-(--radius-brand)"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -left-5 -z-10 h-full w-full rounded-(--radius-brand) border border-accent/28"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal preset="tight">
              <span className="eyebrow">A Word From Our Founder</span>
            </Reveal>

            <Reveal preset="up" delay={0.06}>
              <Quote className="mt-7 size-8 text-accent-strong/40" strokeWidth={1.2} aria-hidden="true" />
            </Reveal>

            <div className="mt-6 flex flex-col gap-6">
              {founder.letter.map((paragraph, index) => (
                <Reveal key={index} preset="up" delay={0.1 + index * 0.06}>
                  <p
                    className={
                      index === 0
                        ? 'drop-cap text-[1.05rem] leading-relaxed text-ink'
                        : 'text-[1.02rem] leading-relaxed text-ink-muted'
                    }
                  >
                    {t(paragraph)}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal preset="up" delay={0.3}>
              <div className="mt-10 border-t border-border pt-8">
                <p className="font-display text-2xl italic text-accent-strong">{t(founder.signature)}</p>
                <p className="mt-3 text-[0.9rem] text-ink">{t(founder.name)}</p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-ink-muted">
                  {t(founder.role)} · {t(founder.credential)}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ================= Milestones ================= */}
      <Section tone="canvas" spacing="lg">
        <SectionHeading
          eyebrow="Our Journey"
          title="How the studio grew."
          lead="A short history of the decisions that shaped how we work today."
          maxWidth="max-w-2xl"
        />

        <RevealGroup stagger={0.08} as="ol" className="mt-16 flex flex-col">
          {milestones.map((milestone) => (
            <RevealItem
              key={milestone.year}
              as="li"
              className="group grid gap-4 border-t border-border py-8 transition-colors duration-500 hover:border-accent/40 md:grid-cols-12 md:gap-8 md:py-10"
            >
              {/*
                `token-safe` on all three, and on the year especially.

                A grid item defaults to `min-width: auto`, which means its
                minimum size is its MIN-CONTENT size. An unfilled placeholder is
                one unbreakable word — `{{MILESTONE_1_YEAR}}` is twenty
                characters with no space in it — so at display size its
                min-content width is roughly 360px in a track that is about
                170px wide. The item cannot shrink to its track, so it spills
                straight over the title beside it.

                Real years ("2011") never do this, which is why the collision
                only appears while the template is unfilled — exactly the state
                a prospect is shown it in. `token-safe` sets `min-width: 0` so
                the item can shrink, and `overflow-wrap: anywhere` so the token
                wraps inside its own column instead of over its neighbour.
              */}
              <span className="token-safe font-display text-3xl leading-none text-accent-strong tabular-nums md:col-span-2 md:text-4xl">
                {t(milestone.year)}
              </span>

              <h3 className="token-safe font-display text-xl leading-snug text-ink md:col-span-4">
                {t(milestone.title)}
              </h3>

              <p className="token-safe text-[0.95rem] leading-relaxed text-ink-muted md:col-span-6">
                {t(milestone.description)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
        <RevealRule />
      </Section>

      {/* ================= Quality standards ================= */}
      <Section tone="muted" spacing="lg" backdrop={siteConfig.media.backdrops.warm}>
        <SectionHeading
          eyebrow="Quality Standards"
          title="What “finished properly” means to us."
          lead="Quality is not a claim, it is a set of checks. These are the ones every project passes through before we hand over the keys."
          align="center"
          maxWidth="max-w-2xl"
        />

        <RevealGroup stagger={0.08} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {qualityStandards.map((standard, index) => (
            <FeatureCard
              key={standard.title}
              icon={standard.icon}
              title={standard.title}
              description={standard.description}
              index={index}
            />
          ))}
        </RevealGroup>
      </Section>

      {/* ================= Why clients choose us ================= */}
      <Section tone="canvas" spacing="lg" backdrop={siteConfig.media.backdrops.warm}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why Clients Choose Us"
              title="Eight reasons people pick this studio over a cheaper quote."
              lead="None of these are unique ideas. What is unusual is finding all eight in the same studio — and getting them in writing."
              maxWidth="max-w-lg"
            >
              <Button asChild size="lg">
                <Link to="/contact">
                  {siteConfig.cta.primary}
                  <ArrowRight
                    className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1.5"
                    strokeWidth={1.7}
                  />
                </Link>
              </Button>
            </SectionHeading>
          </div>

          <RevealGroup stagger={0.05} as="ul" className="lg:col-span-7">
            {clientReasons.map((reason) => (
              <RevealItem
                key={reason}
                as="li"
                preset="tight"
                className="group flex items-center gap-6 border-b border-border py-5 transition-colors duration-500 last:border-b-0 hover:border-accent/40"
              >
                <IconChip
                  icon={Check}
                  tone="outline"
                  size="md"
                  strokeWidth={2.2}
                  className="group-hover:border-accent-button group-hover:bg-accent-button group-hover:text-accent-contrast"
                />
                <span className="text-[0.98rem] leading-relaxed text-ink">{t(reason)}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <ProcessTimeline />
      <Testimonials />
      <FinalCta />
    </>
  );
}
