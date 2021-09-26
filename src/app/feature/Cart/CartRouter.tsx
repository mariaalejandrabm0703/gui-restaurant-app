import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from '../../shared/components/LazyFallback';

const CartPage = React.lazy(() => import('./pages/Cart'));

export const CartRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    <Switch>
      <Route path="/" component={CartPage}></Route>
    </Switch>
  </React.Suspense>
);
