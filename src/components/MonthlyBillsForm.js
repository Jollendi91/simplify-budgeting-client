import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import {addBill} from '../actions/protected-data';
import {SetupInput, Inputs, Button} from './styled-components/Forms';

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
                <Inputs>
                    <div className="form-input-container">
                        <label htmlFor="bill">Bill</label>
                        {errorMessage}
                        <Field 
                            component={SetupInput}
                            type="text"
                            name="bill"
                            id="bill"
                            validate={[required, notEmpty]}
                        />
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="amount">Amount</label>
                        <Field 
                            component={SetupInput}
                            amount
                            type="number"
                            name="amount"
                            id="amount"
                            step="0.01"
                            min="0.01"
                            validate={[required, notEmpty]}
                        />
                    </div>
                    <Button color="#276A73" disabled={this.props.pristine || this.props.submitting}>Add</Button>
                </Inputs>
            </form>
        )
    }
}

export default reduxForm({
    form: 'bills',
    onSubmitFail: (errors, dispatch) => dispatch(focus('bills', Object.keys(errors)[0]))
  })(connect()(MonthlyBillForm));