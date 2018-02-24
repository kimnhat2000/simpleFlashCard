import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import StackScreen from '../components/stackComponents/StackScreen';
import CardScreen from '../components/cardComponents/CardScreen';
import SelectCards from '../components/selectCardComponents/SelectCards';

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