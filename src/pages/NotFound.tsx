import { Link } from 'react-router-dom';
import { ArrowRight, Home, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { primaryNav } from '@/data/navigation';
import { telLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Img } from '@/components/common/Img';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * 404
 * ============================================================================
 * A missing page is a lost lead unless it is treated as a junction.
 *
 * Rather than an apology and a single "go home" button, this page routes the
 * visitor onward: every primary destination, plus the phone number — because
 * someone who reached a dead end while researching a contractor is exactly the
 * person worth catching.
 *
 * It is marked `noindex`, and the design keeps the dark hero treatment so the
 * transparent navbar continues to read correctly.
 * ============================================================================
 */
export default function NotFound() {
  const page = siteConfig.seo.pages.notFound;
  const call = telLink();

  return (
    <>
      <Seo title={page.title} description={page.description} path={page.path} noindex />

      <section className="relative flex min-h-svh items-center overflow-hidden bg-contrast py-32">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <Img
            image={siteConfig.media.ctaBackdrop}
            priority
            tone="dark"
            sizes="100vw"
            className="h-full w-full"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-contrast/90" />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Reveal preset="tight">
              <span className="eyebrow eyebrow--light">Error 404</span>
            </Reveal>

            <Reveal preset="up" delay={0.06}>
              <p
                aria-hidden="true"
                className="mt-6 font-display text-[7rem] leading-none text-white/8 md:text-[11rem]"
              >
                404
              </p>
            </Reveal>

            <Reveal preset="up" delay={0.1}>
              <h1 className="-mt-10 font-display text-h1 text-contrast-ink md:-mt-16">
                This page has been rearranged.
              </h1>
            </Reveal>

            <Reveal preset="up" delay={0.16}>
              <p className="mt-6 max-w-xl text-lead text-contrast-ink/68">
                {t(
                  'The page you were looking for has moved or no longer exists. Here is the quickest way back to what you probably came for.',
                )}
              </p>
            </Reveal>

            {/* ---- Actions ---- */}
            <Reveal preset="up" delay={0.22}>
              <div className="mt-11 flex flex-col gap-3.5 sm:flex-row">
                <Button asChild size="lg">
                  <Link to={routes.home}>
                    <Home className="size-4" strokeWidth={1.7} />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild size="lg" variant="light">
                  <a href={call.href}>
                    <Phone className="size-4" strokeWidth={1.7} />
                    {t(siteConfig.contact.phone)}
                  </a>
                </Button>
              </div>
            </Reveal>

            {/* ---- Onward links ---- */}
            <RevealGroup
              stagger={0.06}
              delay={0.3}
              as="ul"
              className="mt-14 grid gap-px border-t border-white/10 bg-white/8 sm:grid-cols-2"
            >
              {primaryNav
                .filter((item) => item.href !== '/')
                .map((item) => (
                  <RevealItem key={item.href} as="li" preset="tight" className="bg-contrast">
                    <Link
                      to={item.href}
                      className="group flex items-center justify-between gap-4 p-6 transition-colors duration-400 hover:bg-white/4"
                    >
                      <span>
                        <span className="block font-display text-lg text-contrast-ink transition-colors duration-400 group-hover:text-accent">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="mt-1 block text-[0.8rem] text-contrast-ink/65">
                            {item.description}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-contrast-ink/40 transition-all duration-500 ease-luxe group-hover:translate-x-1.5 group-hover:text-accent"
                        strokeWidth={1.6}
                      />
                    </Link>
                  </RevealItem>
                ))}
            </RevealGroup>
          </div>
        </Container>
      </section>
    </>
  );
}
