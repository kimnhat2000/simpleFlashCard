import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';

import CardList from './CardList';
import { addCardToStack } from '../../Redux/actions/stackAction';
import Warning from '../Warning';
import Form from './Form';

class CardScreen extends React.Component{
    constructor(props){
        super(props);
        const {findStack} = this.props
        this.state={
            flip:false,
            cards:findStack[0].cards ? findStack[0].cards : [],
            editForm:false,
            showForm:false,
            cardToEdit:'',
            warning:false,
            selectedCard:'',
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.cards.length !== this.state.cards.length){
            this.props.addCardToStack(this.props.selectedStackId, this.state.cards)
            return;
        }
    }

    onCardClick=(card)=>{
        const { cards } = this.state
        const flippedCard = cards.map(c => c.id===card.id ? {...c, flipped: !c.flipped} : c)
        this.setState({ cards: flippedCard, selectedCard:card})
    }

    onEditCard = (card) => {
        this.setState({cardToEdit:card, editForm: !this.state.editForm, showForm:false})
    }

    onDeleteCard = (card) => {
        this.setState({ warning: true, selectedCard:card })
        this.onWarninghandle

    }

    onWarninghandle = (pass, card) => {
        if(pass){
            const card = this.state.selectedCard
            const cards = this.state.cards.filter(c => c.id !== card.id)
            this.setState({cards, warning:false})
            this.props.addCardToStack(this.props.selectedStackId, this.state.cards)
            return;
        }
        this.setState({warning:false})
        return
    }

    onFormSubmit = (card) => {
        const stackId = this.props.match.params.id;
        const newCard = { stackId, id: uuid(), ...card }
        this.setState({ cards: [...this.state.cards, newCard], showForm:false })
    }

    onSubmitEditCard = (editedCard) => {
        const cards = this.state.cards.map(c => c.id === editedCard.id ? c = editedCard : c);
        this.setState({editForm:false, cards})
        this.props.addCardToStack(this.props.selectedStackId, cards)
    }

    test=()=>{
        console.log(this.props.findStack[0].cards)
        // console.log(this.state.cards)
    }

    render(){
        const { cards, flip, showForm, warning, selectedCard, cardToEdit, editForm } = this.state
        return(
            <div>
                <h1>this is the CardScreen</h1>
                <button onClick={this.test}>test</button>

                <button onClick={()=>this.setState({showForm: !this.state.showForm, editForm:false})}>{this.state.showForm ? 'close form' : 'add card'}</button>

                {showForm &&
                    <Form
                        createCard={(card) => this.onFormSubmit(card)}
                        cards={cards}
                    />
                }

                {editForm &&
                    <Form
                        editCard={cardToEdit}
                        editCardSubmit={(editedCard) => this.onSubmitEditCard(editedCard)}
                        cards={cards}
                    />
                }

                <button><Link to='/'>to stackScreen</Link></button>

                {warning &&
                    <Warning
                        text={`do you want to delete "${selectedCard.name}" card?`}
                        onYes={() => this.onWarninghandle(true)}
                        onNo={() => this.onWarninghandle(false)}
                    />
                }

                <div>
                    <CardList
                        cards={cards}
                        cardClick={(card)=>this.onCardClick(card)}
                        flipped={this.state.flip}
                        deleteCard={this.onDeleteCard}
                        editCard={this.onEditCard}
                        formShow={this.state.editForm}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const findStack = state.stacks.stacks.filter(s=>s.id===state.stacks.selectedStackId)
    return {
        selectedStackId:state.stacks.selectedStackId,
        findStack,
        stacks:state.stacks.stacks
    }
}

const mapDispatchToProps = (dispatch) => ({
    addCardToStack: (stackId, cards) => dispatch(addCardToStack(stackId, cards))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen) 