import uuid from 'uuid';

export const addCard = ({ stackId = '', name = '', description = '' }) => ({
    type: 'ADD_CARD',
    card: {
        stackId,
        id: uuid(),
        name,
        description
    }
})

export const addCards = (cards) => ({
    type: 'ADD_CARDS',
    cards
})

export const removeCard = (id) => ({
    type: 'REMOVE_CARD',
    id
})

export const editCard = (card) => ({
    type: 'EDIT_CARD',
    card
})