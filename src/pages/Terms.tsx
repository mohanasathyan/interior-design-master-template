import { siteConfig } from '@/config/site.config';
import { termsOfService } from '@/data/legal';
import { breadcrumbSchema, webPageSchema, type Crumb } from '@/lib/schema';
import { Seo } from '@/components/common/Seo';
import { LegalDocument } from '@/components/sections/LegalDocument';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * TERMS OF SERVICE
 * ============================================================================
 * The companion to the privacy policy. Copy lives in `src/data/legal.ts`.
 * ============================================================================
 */
const CRUMBS: Crumb[] = [
  { name: 'Home', path: routes.home },
  { name: 'Terms of Service', path: routes.terms },
];

export default function Terms() {
  const page = siteConfig.seo.pages.terms;

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

      <LegalDocument content={termsOfService} crumbs={CRUMBS} />
    </>
  );
}
