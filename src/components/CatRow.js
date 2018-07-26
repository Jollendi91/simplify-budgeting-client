import React from 'react';
import {connect} from 'react-redux';
import { deleteCategory, updateCategory } from '../actions';

export class CatRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            categoryName: this.props.category,
            categoryAmount: this.props.amount
        }
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    dispatchCategoryUpdate(categoryId) {
        if ( this.state.categoryAmount >  (this.props.remainingAmount + this.props.amount)) {
            return
        }

        this.props.dispatch(updateCategory(this.state.categoryName, parseFloat(this.state.categoryAmount), categoryId));
        this.setEditing();
    }


    render() {
        if (this.state.editing) {
          return  (<tr key={this.props.index}>
                <td>
                    <input 
                        value={this.state.categoryName}
                        onChange={e => this.setState({
                            categoryName: e.target.value
                    })}/>
                </td>
                <td>
                    $<input 
                        type="number" 
                        min="1" 
                        max={this.props.amount + this.props.remainingAmount} 
                        value={this.state.categoryAmount}
                        onChange={e => this.setState({
                            categoryAmount: e.target.value
                    })}/>
                </td>
                <td>{Math.round(this.props.amount / (this.props.monthlySalary - this.props.billsTotal)* 10000)/100}%</td>
                <td className="edit-buttons">
                    <button onClick={() => this.dispatchCategoryUpdate(this.props.id)}>Update</button>
                    <button onClick={() => this.setEditing()}>Cancel</button>
                </td>
            </tr>)
        } else {

            return (
                <tr key={this.props.index}>
                    <td>{this.props.category}</td>
                    <td>${this.props.amount}</td>
                    <td>{Math.round(this.props.amount / (this.props.monthlySalary - this.props.billsTotal)* 10000)/100}%</td>
                    <td className="edit-buttons">
                        <button onClick={() => this.setEditing()}>Edit</button>
                        <button onClick={() => this.props.dispatch(deleteCategory(this.props.id))}>X</button>
                    </td>
                </tr>
            )
        }
    }
}

const mapStateToProps = state => ({
    monthlySalary: state.monthlySalary,
    billsTotal: state.bills.reduce((accumulator, currentBill) => accumulator + currentBill.amount, 0)
});

export default connect(mapStateToProps)(CatRow);