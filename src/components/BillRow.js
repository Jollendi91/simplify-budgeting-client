import React from 'react';
import {connect} from 'react-redux';
import {deleteBill, updateBill} from '../actions/protected-data';

export class BillRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            billName: props.bill,
            billAmount: props.amount
        }
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    dispatchBillUpdate(billId) {
        
        this.props.dispatch(updateBill(this.state.billName, parseFloat(this.state.billAmount), billId));
        this.setEditing();
    }

    render() {

        console.log(this.props);

        if (this.state.editing) {
            return (
                <tr>
                    <td className="table-form-container" colSpan="3">
                        <form className="update-bill-form">
                            <div className="bill-name-input">
                                <input value={this.state.billName} onChange={e => this.setState({
                                    billName: e.target.value
                                })} />
                            </div>
                            <div className="bill-amount-input">
                                $<input type="number" step="0.01" min="1" value={this.state.billAmount} onChange={e => this.setState({
                                    billAmount: e.target.value
                                })} />
                            </div>
                            <div className="edit-buttons">
                                <button onClick={() => this.dispatchBillUpdate(this.props.id)}>Update</button>
                                <button onClick={() => this.setEditing()}>Cancel</button>
                            </div>
                        </form>
                    </td>
                </tr> 
            )
        } else {

        return (
            <tr>
                <td>{this.props.bill}</td>
                <td>${parseFloat(this.props.amount).toFixed(2)}</td>
                <td className="edit-buttons">
                    <button onClick={() => this.setEditing()}>Edit</button>
                    <button onClick={() => this.props.dispatch(deleteBill(this.props.id))}>X</button>
                </td>
            </tr>
        )
    }
    }
}

export default connect()(BillRow);