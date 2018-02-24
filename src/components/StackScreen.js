import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addStack, removeStack, editStack, selectStackId } from '../Redux/actions/stackAction';
import StackList from './StackList';
import Warning from './Warning';

class StackScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stackName:'',
            selectedStack:null,
            warning:false,
            editInput:false
        }
    }

    selectedStack = (selectedStack) => {
        this.setState({selectedStack})
    }

    onFormSubmit = (e) => {
        const {editInput} = this.state
        e.preventDefault()
        if(!editInput){
            this.props.addStack({ name: this.state.stackName })
            this.setState({ stackName: '' })
            return;
        }
        this.props.editStack(this.state.selectedStack)
        this.setState({editInput:false})
        return;
    }

    onDeleteStack = () => {
        this.setState({warning:true})
    }

    onEditStack = () => {
        this.setState({editInput:true})
        console.log('edit this stack')
    }

    onOpenStack = (stack) => {
        this.props.selectStackId(stack.id)
    }

    onTest=()=>{
        const {stackName, warning} = this.state
    }

    onWarningHandle=(pass)=>{
        if(pass){
            this.props.removeStack(this.state.selectedStack.id)
            this.setState({ warning: false })
            return;
        }
        this.setState({warning:false})
        return;
    }

    render(){
        const { selectedStack, stackName, warning, editInput } = this.state;
        const { stacks } = this. props
        const grammarCheck = this.props.stacks.length !== 1 && 's'
        return(
            <div>
                <button><Link to='/cards/:id'>to CardsScreen</Link></button>
                <button onClick={this.onTest}>test</button>

            {warning &&
                <Warning
                    text={`do you want to delete the ${selectedStack.name} stack with all of its associated cards?`}
                    onYes={() => this.onWarningHandle(true)}
                    onNo={() => this.onWarningHandle(false)}
                />
            }   

            { stacks.length !== 0 &&
                <h4>you are having {stacks.length} stack{grammarCheck}</h4>
            }

                <form onSubmit={this.onFormSubmit}>
                    <input
                        placeholder='enter stack name'
                        value={editInput ? selectedStack.name : stackName}
                        onChange={e => editInput ? this.setState({selectedStack:{...selectedStack, name:e.target.value}}) : this.setState({ stackName: e.target.value })}
                    />
                    <button>{editInput ? 'change name' : '+'}</button>
                </form>

                <StackList
                    selectedStack={(stack)=>this.selectedStack(stack)}
                    deleteStack={this.onDeleteStack}
                    editStack={this.onEditStack}
                    openStack={this.onOpenStack}
                />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stacks:state.stacks.stacks
})

const mapDispatchToProps = (dispatch) => ({
    addStack:(stack)=>dispatch(addStack(stack)),
    removeStack:(id)=>dispatch(removeStack(id)),
    editStack:(stack)=>dispatch(editStack(stack)),
    selectStackId:(id)=>dispatch(selectStackId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StackScreen)