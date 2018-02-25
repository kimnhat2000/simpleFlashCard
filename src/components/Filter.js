import React from 'react';
import { connect } from 'react-redux';

import { filter } from '../tools/tools';
import { textFilter, sortByStackName, sortByCardName } from '../Redux/actions/filterAction';

class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            sorted:false
        }
    }

    onSearch = (e) => {
        const text = e.target.value
        this.setState({value: e.target.value})
        this.props.dispatch(textFilter(text))
    }

    onSort = () => {
        this.setState({ sorted: !this.state.sorted })
        if(this.props.stackSort){
            this.props.dispatch(sortByStackName());
            return;
        }
        this.props.dispatch(sortByCardName());
        return;
    }

    render(){
        return (
            <div>
                <div>
                    <input
                        placeholder='find by name'
                        value={this.state.value}
                        onChange={this.onSearch}
                    />
                    <button onClick={this.onSort}>{this.state.sorted ? 'original order' : 'sort by name'}</button>
                </div>
            </div>
        )
    }
}

export default connect()(Filter)