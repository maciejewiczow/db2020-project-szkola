import React from 'react'
import { Switch, Route, HashRouter, Link } from "react-router-dom";

import * as Views from './Views';

const App: React.FC = () => (
    <HashRouter>
        <Switch>
            <Route path="/dashboard">
                <h1>Dashboard</h1>
                <Link to="/">Back to login</Link>
            </Route>
            <Route path="/" component={Views.Login} />
        </Switch>
    </HashRouter>
);

export default App;
