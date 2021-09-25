import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from '../../shared/components/LazyFallback';

const MyOrderPage = React.lazy(() => import('./pages/MyOrderPage'));

export const MyOrderRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    <Switch>
      <Route path="/myOrder" component={MyOrderPage}></Route>
    </Switch>
  </React.Suspense>
);
