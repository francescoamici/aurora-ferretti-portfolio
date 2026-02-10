import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from '@auror/shared-ui';
import { ThemeShell } from './components/ThemeShell';

const Gateway = lazy(() => import('./gateway/Gateway'));
const V1App = lazy(() => import('./themes/v1/App'));
const V2App = lazy(() => import('./themes/v2/App'));
const V3App = lazy(() => import('./themes/v3/App'));
const V4App = lazy(() => import('./themes/v4/App'));
const V5App = lazy(() => import('./themes/v5/App'));
const V6App = lazy(() => import('./themes/v6/App'));
const V7App = lazy(() => import('./themes/v7/App'));
const V8App = lazy(() => import('./themes/v8/App'));
const V9App = lazy(() => import('./themes/v9/App'));
const V10App = lazy(() => import('./themes/v10/App'));
const V11App = lazy(() => import('./themes/v11/App'));
const V12App = lazy(() => import('./themes/v12/App'));
const V13App = lazy(() => import('./themes/v13/App'));
const V14App = lazy(() => import('./themes/v14/App'));
const V15App = lazy(() => import('./themes/v15/App'));

function themeRoute(num: number, Component: React.LazyExoticComponent<() => React.JSX.Element>) {
  return (
    <Route
      key={num}
      path={`/v${num}/*`}
      element={
        <ThemeShell theme={`v${num}`} basePath={`/v${num}`}>
          <Component />
        </ThemeShell>
      }
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Gateway />} />
          {themeRoute(1, V1App)}
          {themeRoute(2, V2App)}
          {themeRoute(3, V3App)}
          {themeRoute(4, V4App)}
          {themeRoute(5, V5App)}
          {themeRoute(6, V6App)}
          {themeRoute(7, V7App)}
          {themeRoute(8, V8App)}
          {themeRoute(9, V9App)}
          {themeRoute(10, V10App)}
          {themeRoute(11, V11App)}
          {themeRoute(12, V12App)}
          {themeRoute(13, V13App)}
          {themeRoute(14, V14App)}
          {themeRoute(15, V15App)}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
