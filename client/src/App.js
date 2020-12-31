import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

const App = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component= {Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/home" component= {Register}/>
                <Route component= {NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;