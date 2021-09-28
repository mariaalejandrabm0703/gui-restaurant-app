import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { CartRouter } from 'app/feature/Cart/CartRouter';
import { HomeRouter } from 'app/feature/Home/HomeRouter';
import { MenuRouter } from 'app/feature/Menu/MenuRouter';
import { MyOrderRouter } from 'app/feature/MyOrder/MyOrderRouter';
import { NavigationHeader } from 'app/shared/components/NavigationHeader';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavigationHeader />
      <hr></hr>
      <Switch>
        <Route path="/" exact component={HomeRouter} />
        <Route path="/myOrder" component={MyOrderRouter} />
        <Route path="/menu" component={MenuRouter} />
        <Route path="/cart" component={CartRouter}/>
        <Redirect to="/" />
      </Switch>
      
    </BrowserRouter>
  );
};
