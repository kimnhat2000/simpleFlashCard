import { createStore, combineReducers } from 'redux';

import { stackReducer, cardReducer } from '../reducers/reducers'

export default () => {
    const store = createStore(
            combineReducers({
                stacks: stackReducer,
                cards: cardReducer
            })
        );
    return store;
};


