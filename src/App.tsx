import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { Layout } from '@/components/layout/Layout';

/**
 * ============================================================================
 * APP
 * ============================================================================
 * Routing and code splitting.
 *
 * Every route is lazily loaded, so a first-time visitor landing on the home
 * page downloads only the home page's JavaScript. On a mid-range phone over a
 * mobile connection — which is the majority of traffic for a local service
 * business — that is the difference between a good and a poor Lighthouse
 * score.
 *
 * The home page is imported eagerly because it is the overwhelmingly likely
 * entry point, and lazily loading it would add a round-trip to the LCP path.
 * ============================================================================
 */
import Home from '@/pages/Home';

const Services = lazy(() => import('@/pages/Services'));
const Projects = lazy(() => import('@/pages/Projects'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/**
 * Route-transition fallback.
 *
 * The height is reserved so the footer does not leap up the screen while a
 * chunk downloads, but the spinner itself is delayed by 400ms via
 * `animate-appear-late`. On any connection that fetches a 40 KB chunk quickly —
 * which is most of them — the visitor sees a clean hold and never a flash of
 * spinner, which is the thing that actually reads as cheap.
 */
function RouteFallback() {
  return (
    <div className="grid min-h-svh place-items-center bg-canvas" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <span
        aria-hidden="true"
        className="size-8 animate-appear-late rounded-full border border-border border-t-accent"
      />
    </div>
  );
}

export default function App() {
  return (
    /*
     * `LazyMotion` + the `m.*` components ship only the animation, gesture and
     * exit features. The default `motion.*` component statically includes drag,
     * layout projection and reorder — roughly 12 KB gzipped this site never
     * uses. `strict` turns any stray `motion.*` into a loud runtime error
     * rather than silently pulling the full bundle back in.
     *
     * `domAnimation` is imported synchronously on purpose: lazily fetching the
     * feature bundle would leave entrance animations in their `initial` state
     * (opacity 0) for a beat, which is worse than the bytes it saves.
     */
    <LazyMotion features={domAnimation} strict>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="services"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <Services />
                  </Suspense>
                }
              />
              <Route
                path="projects"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path="about"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LazyMotion>
  );
}
