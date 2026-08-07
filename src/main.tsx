import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './index.css';

/**
 * Application entry point.
 *
 * `StrictMode` is enabled deliberately. It double-invokes effects in
 * development, which surfaces exactly the class of bug — an un-cleaned
 * scroll listener, a duplicated `<meta>` tag — that this kind of marketing
 * site is prone to. It has no effect on the production bundle.
 */
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found in index.html');
}

/*
 * The boundary wraps `<App />` rather than sitting inside it, so it also covers
 * the providers — `LazyMotion`, `ThemeProvider`, `BrowserRouter`. A boundary
 * mounted below those cannot catch a failure in them, and it is the outermost
 * layers that leave the boot splash stranded on screen when they throw.
 */
createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
