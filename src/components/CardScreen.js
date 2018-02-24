import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';

import CardList from './CardList';
import { addCardToStack } from '../Redux/actions/stackAction';
import Warning from './Warning';

class CardScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            flip:false,
            cards:[
                // {
                //     stackId:this.props.match.params.id,
                //     id: uuid(),
                //     name:'card1',
                //     description:'this is card 1 description',
                //     flipped:false

                // },
                // {
                //     stackId: this.props.match.params.id,
                //     id: uuid(),
                //     name: 'card2',
                //     description: 'this is card 2 description',
                //     flipped: false
                // },
                // {
                //     stackId: this.props.match.params.id,
                //     id: uuid(),
                //     name: 'card3',
                //     description: 'this is card 3 description',
                //     flipped: false
                // }
            ],
            editForm:false,
            showForm:false,
            cardName:'',
            cardDescription:'',
            warning:false,
            selectedCard:''
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.cards.length !== this.state.cards.length){
            console.log(this.props.selectedStackId)
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
        console.log(card)
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
            return;
        }
        this.setState({warning:false})
        return
    }

    onAddCardSubmit = (e) => {
        e.preventDefault();
        const { cardName, cardDescription } = this.state;
        const stackId = this.props.match.params.id;
        const newCard = { stackId, id: uuid(), name: cardName, description: cardDescription }
        this.setState({ cards: [...this.state.cards, newCard] })
    }


    test=()=>{
        console.log(this.props.selectedStackId)
        console.log(this.props.findStack[0].cards)
    }

    render(){
        const { cards, flip, showForm, warning, selectedCard } = this.state
        return(
            <div>
                <h1>this is the CardScreen</h1>
                <button onClick={this.test}>test</button>

                <button onClick={()=>this.setState({showForm: !this.state.showForm})}>add cards</button>

                {showForm &&
                    <form onSubmit={this.onAddCardSubmit}>
                        <input
                            placeholder='add card name'
                            value={this.state.cardName}
                            onChange={(e) => this.setState({ cardName: e.target.value })}
                        />
                        <textarea
                            rows='10' cols='50'
                            value={this.state.cardDescription}
                            onChange={e => this.setState({ cardDescription: e.target.value })}
                        />
                        <button>add card</button>
                    </form>
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