import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from '../../shared/components/LazyFallback';

const HomeMainPage = React.lazy(() => import('./pages/Main'));

export const HomeRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    <Switch>
      <Route path="/" component={HomeMainPage}></Route>
    </Switch>
  </React.Suspense>
);
