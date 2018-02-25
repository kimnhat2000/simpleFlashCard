import { createStore, combineReducers } from 'redux';

import { stackReducer, cardReducer, filterReducer } from '../reducers/reducers'

export default () => {
    const store = createStore(
            combineReducers({
                stacks: stackReducer,
                cards: cardReducer,
                filter: filterReducer,
            })
        );
    return store;
};


