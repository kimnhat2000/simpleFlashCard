import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import Routers from './routers/Routers';
import configureStore from './Redux/store/reduxStore';

import { addCard } from './Redux/actions/cardAction';
import { addStack } from './Redux/actions/stackAction';

const store = configureStore();

store.dispatch(addStack({ name: 'stack 1' }))
store.dispatch(addStack({ name: 'stack 2' }))
store.dispatch(addStack({ name: 'stack 3' }))
store.dispatch(addStack({ name: 'stack 4' }))

const state = store.getState();

const app = (
    <Provider store={store}>
        <Routers />
    </Provider>
    )

ReactDom.render(app, document.getElementById('app'))