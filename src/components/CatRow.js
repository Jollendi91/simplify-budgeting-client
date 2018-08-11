import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import Input from './input';

import { deleteCategory, updateCategory } from '../actions/protected-data';

import './CatRow.css';

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

    onSubmit(values) {
        const {category, amount} = values;
        this.props.dispatch(updateCategory(this.props.id, category, amount)).then(() => this.setEditing());
    }
    
    render() {
        let updateAmount;
        if (this.props.currentForm !== undefined) {
            if (this.props.currentForm.values) {
                updateAmount = this.props.currentForm.values.amount;
            }
        }
        console.log(updateAmount)

        if (this.state.editing) {
          return  (
            <tr>
                <td className="category-form-container" colSpan="4">
                    <form className="update-category-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                        <div className="category-name-input">
                            <Field
                                component={Input}
                                type="text"
                                name="category"
                                id="category-update"
                                validate={[required, notEmpty]}
                            />
                        </div>
                        <div className="category-amount-input">
                            $<Field 
                                component={Input}
                                type="number"
                                name="amount"
                                id="category-amount-update"
                                step="0.01"
                                min="0.01"
                                //max={this.props.remainingAmount}
                                validate={[required, notEmpty]}
                            />
                        </div>
                        <div>
                            {Math.round(updateAmount / (this.props.monthlySalary - this.props.billsTotal)* 10000)/100}%
                        </div>
                        <div className="edit-buttons">
                            <button type="submit" disabled={this.props.pristine || this.props.submitting}>Update</button>
                            <button onClick={() => this.setEditing()}>Cancel</button>
                        </div>
                    </form>
                </td> 
            </tr>
            )
        } else {

            return (
                <tr key={this.props.index}>
                    <td>{this.props.category}</td>
                    <td>${parseFloat(this.props.amount).toFixed(2)}</td>
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

const mapStateToProps = (state, props) => {
   return {
    monthlySalary: state.simplify.user.monthlySalary,
    billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0),
    initialValues: props,
    currentForm: state.form[props.form]
}
};

export default connect(mapStateToProps)(reduxForm({
    onSubmitFail: (errors, dispatch, submitError, props) => dispatch(focus(props.form, Object.keys(errors)[0]))
  })(CatRow));