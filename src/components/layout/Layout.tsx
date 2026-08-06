import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from './FloatingActions';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { PageTransition } from '@/components/common/PageTransition';

/**
 * ============================================================================
 * LAYOUT
 * ============================================================================
 * The persistent application shell. Everything here survives route changes,
 * which means the navbar never re-mounts and the page transition stays smooth.
 *
 * `<main id="main-content">` is the target of the skip link and is marked
 * `tabIndex={-1}` so keyboard focus can be moved into it programmatically.
 * ============================================================================
 */
export function Layout() {
  return (
    <div className="flex min-h-svh flex-col bg-canvas">
      <ScrollToTop />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
