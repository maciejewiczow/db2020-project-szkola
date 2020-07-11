import React from 'react'
import { Switch, Route, HashRouter, Link } from "react-router-dom";

import * as Views from './Views';

const App: React.FC = () => (
    <HashRouter>
        <Switch>
            <Route path="/dashboard" component={Views.Dashboard} />
            <Route path="/" component={Views.LoginView} />
        </Switch>
    </HashRouter>
);

export default App;
