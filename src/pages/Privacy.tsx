import { siteConfig } from '@/config/site.config';
import { privacyPolicy } from '@/data/legal';
import { breadcrumbSchema, webPageSchema, type Crumb } from '@/lib/schema';
import { Seo } from '@/components/common/Seo';
import { LegalDocument } from '@/components/sections/LegalDocument';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * PRIVACY POLICY
 * ============================================================================
 * A real page at a real URL, because the contact form asks for a name, a phone
 * number and an email address. A footer link that pointed at the contact page
 * was worse than no link: it implied a policy existed.
 *
 * The copy lives in `src/data/legal.ts` so a client customises content without
 * touching a component.
 * ============================================================================
 */
const CRUMBS: Crumb[] = [
  { name: 'Home', path: routes.home },
  { name: 'Privacy Policy', path: routes.privacy },
];

export default function Privacy() {
  const page = siteConfig.seo.pages.privacy;

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

      <LegalDocument content={privacyPolicy} crumbs={CRUMBS} />
    </>
  );
}
