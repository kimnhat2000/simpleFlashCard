import React from 'react';

const Warning = ({text, onYes, onNo}) => {
    
    return (
        <div>
            <h3>{text}</h3>
            <button onClick={onYes}>yes</button>
            <button onClick={onNo}>no</button>
        </div>
    )
}

export default Warning;