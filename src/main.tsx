import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
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

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
