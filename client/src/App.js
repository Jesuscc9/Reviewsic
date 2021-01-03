import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

const App = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/home" component= {Register}/>
                <Route exact path="/" component= {Home}/>
                <Route component= {NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;