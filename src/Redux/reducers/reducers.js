//stack reducer
const defaultStackState = {
    selectedStackId:{},
    stacks:[]
};
export const stackReducer = (state = defaultStackState, action) => {
    switch (action.type) {
        case 'ADD_STACK':
            return {
                ...state,
                stacks:[...state.stacks, action.stack]
            }
        case 'REMOVE_STACK':
            return {
                ...state,
                stacks:state.stacks.filter(stack => stack.id !== action.id)
            }
        case 'EDIT_STACK':
            return {
                ...state,
                stacks: state.stacks.map(stack => stack.id === action.stack.id ? stack = action.stack : stack)
            }
        case 'ADD_CARD_TO_STACK':
            return {
                ...state,
                stacks: state.stacks.map(stack => stack.id === action.stackId ? stack = {...stack, cards:action.cards} : stack)}
        case 'SELECT_STACK':
            return {
                ...state,
                selectedStackId: action.id
            }
        default:
            return state;
    }
};

//filter reducer
const defaultFilterReducer = { text: '', sortByStackName: false, sortByCardName: false};
export const filterReducer = (state = defaultFilterReducer, action) => {
    switch (action.type) {
        case 'TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_STACK_NAME':
            return {
                ...state,
                sortByStackName: !state.sortByStackName
            }
        case 'SORT_BY_CARD_NAME':
            return {
                ...state,
                sortByCardName: !state.sortByCardName
            }
        default:
            return state;
    }
}

//card reducer
const defaultCardState = [];
export const cardReducer = (state = defaultCardState, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return [...state, action.card]
        case 'ADD_CARDS':
            return action.cards
        case 'REMOVE_CARD':
            return state.filter(c => c.id !== action.id)
        case 'EDIT_CARD':
            return state.map(c => c.id === action.card.id ? c = action.card : c)

        default:
            return state;
    }
}

