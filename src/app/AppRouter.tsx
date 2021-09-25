import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { HomeRouter } from 'app/feature/Home/HomeRouter';
import { NavigationHeader } from 'app/shared/components/NavigationHeader';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavigationHeader />
      <Switch>
        <Route path="/" exact component={HomeRouter} />
        <Route path="/myOrder" component={HomeRouter} />
        <Route path="/menu" component={HomeRouter} />
        <Route path="/cart" component={HomeRouter} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
