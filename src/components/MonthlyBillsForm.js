import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {addBill} from '../actions/protected-data';

export class MonthlyBillForm extends React.Component {
    onSubmit(values) {
        const {bill, amount} = values;
        return this.props.dispatch(addBill(bill, amount)).then(() => this.props.reset());
    }
 
    render() {

        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">
                    {this.props.error}
                </div>
            );
        }

        return (
            <form className="add-bill-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                 <label htmlFor="bill">Bill</label>
                 {errorMessage}
                <Field 
                    component={Input}
                    type="text"
                    name="bill"
                    id="bill"
                    validate={[required, notEmpty]}
                />
                 <label htmlFor="amount">Amount</label>
                 <Field 
                    component={Input}
                    type="number"
                    name="amount"
                    id="amount"
                    step="0.01"
                    min="0.01"
                    validate={[required, notEmpty]}
                />
                <button disabled={this.props.pristine || this.props.submitting}>Add Bill</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'bills',
    onSubmitFail: (errors, dispatch) => dispatch(focus('monthlySalary', 'monthly-salary'))
  })(connect()(MonthlyBillForm));