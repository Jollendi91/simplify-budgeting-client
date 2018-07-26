import React from 'react';
import {connect} from 'react-redux';
import { deleteTransaction, updateTransaction } from '../actions';

export class TransRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            transName: this.props.description,
            transDate: this.props.date,
            transAmount: this.props.amount
        }
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    dispatchTransactionUpdate(transactionId) {
        this.props.dispatch(updateTransaction(this.state.transName, this.state.transDate, parseFloat(this.state.transAmount), transactionId));

        this.setEditing();
    }

    render() {
        if (this.state.editing) {
            return (
                <tr>
                    <td>
                        <input value={this.state.transName} onChange={e => this.setState({
                            transName: e.target.value
                        })} />
                    </td>
                    <td>
                        <input type="date" value={this.state.transDate} onChange={e => this.setState({
                            transDate: e.target.value
                        })} />
                    </td>
                    <td>
                        $<input type="number" value={this.state.transAmount} onChange={e => this.setState({
                            transAmount: e.target.value
                        })} />
                    </td>
                    <td>
                        <button onClick={() => this.dispatchTransactionUpdate(this.props.id)}>Update</button>
                        <button onClick={() => this.setEditing()}>Cancel</button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.description}</td>
                    <td>{this.props.date}</td>
                    <td>${this.props.amount.toFixed(2)}</td>
                    <td>
                    <button onClick={() => this.setEditing()}>Edit</button>
                        <button onClick={() => this.props.dispatch(deleteTransaction(this.props.id))}>X</button>
                    </td>
                </tr>
            )
        }
    }
}

export default connect()(TransRow);