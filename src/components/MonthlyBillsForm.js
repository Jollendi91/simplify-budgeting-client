import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';


export class MonthlyBillForm extends React.Component {
 
    render() {

        const lessThan = (value, previousValue) => value > 1 ? value : previousValue;

        return (
            <form className="add-bill-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                 <label htmlFor="description">Description</label>
                <Field 
                    component={Input}
                    type="text"
                    name="description"
                    id="description"
                    validate={[required, notEmpty]}
                />
                 <label htmlFor="amount">Amount</label>
                 <Field 
                    component={Input}
                    type="number"
                    name="amount"
                    id="amount"
                    min="0.01"
                    normalize={lessThan}
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