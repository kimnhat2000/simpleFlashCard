import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import StackScreen from '../components/StackScreen';
import CardScreen from '../components/CardScreen';
import SelectCards from '../components/SelectCards';

const Routers = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' component={StackScreen} exact={true}/>
            <Route path='/cards/:id' component={CardScreen}/>
            <Route path='/selectCards' component={SelectCards}/>
        </Switch>
    </BrowserRouter>
)

export default Routers