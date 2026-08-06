import { siteConfig } from '@/config/site.config';
import { faqs } from '@/data/faqs';
import { services } from '@/data/services';
import { breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from '@/lib/schema';
import { Seo } from '@/components/common/Seo';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { StatsBand } from '@/components/sections/StatsBand';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { Transformation } from '@/components/sections/Transformation';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { DesignPhilosophy } from '@/components/sections/DesignPhilosophy';
import { MaterialsSection } from '@/components/sections/MaterialsSection';
import { PromiseSection } from '@/components/sections/PromiseSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCta } from '@/components/sections/FinalCta';

/**
 * ============================================================================
 * HOME
 * ============================================================================
 * The narrative order is deliberate, and it mirrors how a high-value purchase
 * decision is actually made:
 *
 *   1  Hero            — desire        "I want this."
 *   2  Trust strip     — reassurance   "They look legitimate."
 *   3  Statistics      — credibility   "They have done this before."
 *   4  Why choose us   — objections    "But what about…?"
 *   5  Services        — relevance     "Do they do my thing?"
 *   6  Portfolio       — proof         "Show me."
 *   7  Transformation  — the delta     "Show me what you CHANGED."
 *   8  Process         — safety        "What happens after I pay?"
 *   9  Philosophy      — taste         "Do they think like me?"
 *  10  Materials       — rigour        "Is it built properly?"
 *  11  Promise         — risk reversal "What if it goes wrong?"
 *  12  Testimonials    — social proof  "What do others say?"
 *  13  FAQs            — final doubts  "One last thing…"
 *  14  Final CTA       — the ask       "Let's talk."
 *
 * Reordering is easy, but this sequence answers each question at the moment it
 * naturally arises — which is why the page keeps people scrolling.
 * ============================================================================
 */
export default function Home() {
  const page = siteConfig.seo.pages.home;

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={page.path}
        schemas={[
          webPageSchema(page.title, page.description, page.path),
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
          serviceSchema(services),
          faqSchema(faqs),
        ]}
      />

      <Hero />
      <TrustStrip />
      <StatsBand />
      <WhyChooseUs />
      <ServicesOverview />
      <PortfolioPreview />
      <Transformation />
      <ProcessTimeline />
      <DesignPhilosophy />
      <MaterialsSection />
      <PromiseSection />
      <Testimonials />
      <FaqSection tone="surface" />
      <FinalCta />
    </>
  );
}
