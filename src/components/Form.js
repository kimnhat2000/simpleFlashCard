import React from 'react';
import uuid from 'uuid';

class Form extends React.Component{
    constructor(props){
        super(props);
        const { createCard, editCard, editCardSubmit } = this.props
        this.state={
            name:editCard ? editCard.name : '',
            description: editCard ? editCard.description : '',
            error:''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.editCard){
            const name = nextProps.editCard.name;
            const description = nextProps.editCard.description;
            this.setState({name, description})
            return;
        }
        return;
    }

    onCardSubmit = (e) => {
        e.preventDefault();
        const { name, description } = this.state;
        if(!name){
            this.setState({error:'you must enter card name'})
            return;
        }
        if(!this.props.editCard){
            const newCard = { id: uuid(), name, description }
            this.props.createCard(newCard)
            this.setState({error:'', name:'', description:''})
            return;
        }
        const editedCard = {...this.props.editCard, name, description}
        this.props.editCardSubmit(editedCard)
        this.setState({error:''})
    }

    render(){
        return (
            <form onSubmit={this.onCardSubmit}>
                <h4>{this.state.error}</h4>
                <input
                    placeholder='add card name'
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                />
                <textarea
                    rows='10' cols='50'
                    value={this.state.description}
                    onChange={e => this.setState({ description: e.target.value })}
                />
                <button>{this.props.editCard ? 'edit' : 'add card'}</button>
            </form>
        )
    }
}

export default Form
