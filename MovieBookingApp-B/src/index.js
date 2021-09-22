import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./screens/home/Home";
import Details from "./screens/details/Details";
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './common/notfound/NotFound';
import 'typeface-roboto';
import BookShow from './screens/bookshow/BookShow';


ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail" component={Details} />
        <Route path="/bookshow" component={BookShow} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
,
  document.getElementById('root')
);