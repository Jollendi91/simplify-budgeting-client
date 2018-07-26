import React from 'react';
import {connect} from 'react-redux';
import { deleteCategory } from '../actions';

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

    render() {
        if (this.state.editing) {
          return  (<tr key={this.props.index}>
                <td>
                    <input value={this.state.categoryName}
                    onChange={e => this.setState({
                        categoryName: e.target.value
                    })}/>
                </td>
                <td>
                    $<input value={this.state.categoryAmount}
                    onChange={e => this.setState({
                        categoryAmount: e.target.value
                    })}/>
                </td>
                <td>{Math.round(this.props.amount / (this.props.monthlySalary - this.props.billsTotal)* 10000)/100}%</td>
                <td className="edit-buttons">
                    <button onClick={() => this.setEditing()}>Update</button>
                    <button onClick={() => this.setEditing()}>X</button>
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