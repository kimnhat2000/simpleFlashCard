import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import Routers from './routers/Routers';
import configureStore from './Redux/store/reduxStore';

import { addCard } from './Redux/actions/cardAction';
import { addStack, addCardToStack, selectStackId } from './Redux/actions/stackAction';
import uuid from 'uuid';

const store = configureStore();

store.dispatch(addStack({ name: 'stack 1' }))
store.dispatch(addStack({ name: 'stack 2' }))
store.dispatch(addStack({ name: 'stack 3' }))
store.dispatch(addStack({ name: 'stack 4' }))
store.dispatch(selectStackId(store.getState().stacks.stacks[0].id))

const cards = [
    {
        stackId: store.getState().stacks.stacks[0].id,
        id: uuid(),
        name: 'card1',
        description: 'this is card 1 description',
        flipped: false

    },
    {
        stackId: store.getState().stacks.stacks[0].id,
        id: uuid(),
        name: 'card2',
        description: 'this is card 2 description',
        flipped: false
    },
    {
        stackId: store.getState().stacks.stacks[0].id,
        id: uuid(),
        name: 'card3',
        description: 'this is card 3 description',
        flipped: false
    },
    {
        stackId: store.getState().stacks.stacks[0].id,
        id: uuid(),
        name: 'card4',
        description: 'this is card 4 description',
        flipped: false
    }
    
]

store.dispatch(addCardToStack(store.getState().stacks.stacks[0].id, cards))

const state = store.getState();

const app = (
    <Provider store={store}>
        <Routers />
    </Provider>
    )

ReactDom.render(app, document.getElementById('app'))