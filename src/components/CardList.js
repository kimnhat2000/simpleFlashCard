import React from 'react';
import { connect } from 'react-redux';

const CardList = ({ cards, cardClick, deleteCard, editCard }) => {
    const list = cards.map((c,i) => (
        <div key={i}>
            <div  
                onClick={() => cardClick(c)}
            >
                {c.flipped ? <h3>{c.description}</h3> : <h3>{c.name}</h3>}
            </div>
            <div>
                <button onClick={() => deleteCard(c)}>-</button>
                <button onClick={() => editCard(c)}>edit</button>
            </div>
        </div>
    ))
    return (
        <div>
            {list}
        </div>
    )
}

export default CardList;