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
            editInput:false,
            error:'',
            okButton:false
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        const {editInput} = this.state
        const nameCheck = this.props.stacks.map(s => s.name.toLowerCase())
        const stacksToCheck = editInput && this.props.stacks.filter(s=>s.id !== this.state.selectedStack.id)
        const editNameCheck = editInput && stacksToCheck.map(s => s.name.toLowerCase())
        if(!this.state.stackName && !editInput){
            this.setState({error:'please enter stack name', okButton:true})
            return;
        }
        if(!editInput){
            if(nameCheck.includes(this.state.stackName.toLowerCase())){
                this.setState({error:'this stack already exists', okButton:true, stackName:''})
                return;
            }else
            this.props.addStack({ name: this.state.stackName })
            this.setState({ stackName: '' })
            return;
        //edit stack
        }else
            if (editNameCheck.includes(this.state.selectedStack.name.toLowerCase())){
            this.setState({error:'this stack already exists', okButton:true})
            return;
        }
        this.props.editStack(this.state.selectedStack)
        this.setState({editInput:false})
        return;
    }

    onDeleteStack = (s) => {
        this.setState({ warning: true, selectedStack: s})
    }

    onEditStack = (s) => {
        this.setState({ editInput: true, selectedStack: s})
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
                    <h4>{this.state.error}</h4>
                    <input
                        placeholder='enter stack name'
                        value={editInput ? selectedStack.name : stackName}
                        onChange={e => editInput ? this.setState({selectedStack:{...selectedStack, name:e.target.value}}) : this.setState({ stackName: e.target.value })}
                    />
                    <button>{editInput ? 'change name' : '+'}</button>
                    {this.state.okButton &&
                        <button onClick={()=>this.setState({error:'', okButton:false})}>OK</button>
                    }
                </form>

                <StackList
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