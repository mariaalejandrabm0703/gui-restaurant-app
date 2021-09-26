import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from '../../shared/components/LazyFallback';

const MenuPage = React.lazy(() => import('./pages/Menu'));

export const MenuRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    <Switch>
      <Route path="/" component={MenuPage}></Route>
    </Switch>
  </React.Suspense>
);
