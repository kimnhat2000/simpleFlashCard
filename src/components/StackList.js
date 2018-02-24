import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StackList = ({ stacks, selectedStack, deleteStack, editStack, openStack }) => {
    const onStackClick = (stack) => {
        selectedStack(stack)
    }

    const list = stacks.map((s,i) => (
        <div 
            key={i}
            onClick={()=>onStackClick(s)}
        >
            <h3><Link to={`/cards/${s.id}`} onClick={() => openStack(s)}>{s.name}</Link></h3>
            <div>
                <button onClick={deleteStack}>-</button>
                <button onClick={editStack}>edit</button>
                <Link to={`/cards/${s.id}`}><button onClick={() => openStack(s)}>open</button></Link>
            </div>
        </div>
    ))
    return(
        <div>
            {list}
        </div>
    )
}

const mapStateToProps = (state) => ({
    stacks:state.stacks.stacks
})

export default connect(mapStateToProps, null)(StackList)