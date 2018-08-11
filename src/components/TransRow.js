import React from 'react';
import {connect} from 'react-redux';
import { deleteTransaction, updateTransaction } from '../actions/protected-data';

export class TransRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    dispatchTransactionUpdate(transactionId) {
        this.props.dispatch(updateTransaction(this.state.transName, this.state.transDate, parseFloat(this.state.transAmount), transactionId, this.props.categoryId));

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
                        $<input type="number" step="0.01" min="1" value={this.state.transAmount} onChange={e => this.setState({
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
                    <td>{this.props.transaction}</td>
                    <td>{this.props.date}</td>
                    <td>${parseFloat(this.props.amount).toFixed(2)}</td>
                    <td className="edit-buttons">
                        <button onClick={() => this.setEditing()}>Edit</button>
                        <button onClick={() => this.props.dispatch(deleteTransaction(this.props.id, this.props.categoryId))}>X</button>
                    </td>
                </tr>
            )
        }
    }
}

export default connect()(TransRow);