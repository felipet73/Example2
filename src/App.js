import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import Layout from './views/layout';

//Views
// import Proyects from "./views/Proyects";
import Home from "./views/Home";

import Proyects from "./views/Proyects";
import PagPrincipal from "./views/PagPrincipal";

function App() {
	const dispatch = useDispatch();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PagPrincipal} />
        <Layout>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
