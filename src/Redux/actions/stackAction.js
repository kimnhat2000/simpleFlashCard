import uuid from 'uuid';

export const addStack = ({ name = '', cards = [] }) => ({
    type: 'ADD_STACK',
    stack: {
        id: uuid(),
        name,
        cards
    }
});

export const removeStack = (id) => ({
    type: 'REMOVE_STACK',
    id
});

export const editStack = (stack) => ({
    type: 'EDIT_STACK',
    stack
});

export const addCardToStack = (stackId, cards) => ({
    type: 'ADD_CARD_TO_STACK',
    stackId,
    cards
})

export const selectStackId = (id) => ({
    type: 'SELECT_STACK',
    id
})