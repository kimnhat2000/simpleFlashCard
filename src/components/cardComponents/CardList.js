import React from 'react';
import { connect } from 'react-redux';

import { filter } from '../../tools/tools';

const CardList = ({ cards, cardClick, deleteCard, editCard, formShow, cardsFilter }) => {
    const { text, sortByCardName } = cardsFilter
    const filteredCards = filter(cards, text, sortByCardName)

    const list = filteredCards.map((c,i) => (
        <div key={i}>
            <div  
                onClick={() => cardClick(c)}
            >
                {c.flipped ? <h3>{c.description}</h3> : <h3>{c.name}</h3>}
            </div>
            <div>
                <button onClick={() => deleteCard(c)}>-</button>
                <button onClick={() => editCard(c)}>{formShow ? 'close' : 'edit'}</button>
            </div>
        </div>
    ))
    return (
        <div>
            {list}
        </div>
    )
}

const mapStateToProps = (state) => ({
    cardsFilter: state.filter
})

export default connect (mapStateToProps)(CardList);