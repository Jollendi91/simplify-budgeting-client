import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {addTransaction} from '../actions/protected-data';

import {SetupInput, Inputs, Button} from './styled-components/Forms';

export class TransactionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayTransForm: false
        }
    }

    onSubmit(values) {
        const {transaction, date, amount} = values;
        this.props.dispatch(addTransaction(transaction, date, amount, this.props.categoryId)).then(() => this.props.reset());
    } 

    setDisplayForm() {
        this.setState({
            displayTransForm: !this.state.displayTransForm
        });
    }

    render() {
        if (this.state.displayTransForm) {
            return (
                <form className="add-transaction-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <div className="form-input-container">
                        <label htmlFor="transaction-name">Description</label>
                        <Field
                            component={SetupInput}
                            type="text"
                            name="transaction"
                            id="transaction-name"
                            validate={[required, notEmpty]}
                        />
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="transaction-date">Date</label>
                        <Field 
                            component={SetupInput}
                            type="date"
                            name="date"
                            id="transaction-date"
                            validate={[required, notEmpty]}
                        />
                    </div>
                    <div className="form-input-container">
                        <label htmlFor="transaction-amount">Amount</label>
                        <Field
                            component={SetupInput}
                            type="number"
                            name="amount"
                            id="transaction-amount"
                            min="0.01"
                            step="0.01"
                            validate={[required, notEmpty]}
                        />
                    </div>
                    <Button color="#276A73" disabled={this.props.pristine || this.props.submitting}>Add</Button>
                </form>
            )
        } else {
            return (
                <Button color="#276A73" onClick={() => this.setDisplayForm()}>Add Transaction</Button>
            )
        }
    }
}

export default reduxForm({
    form: 'transactions',
    onSubmitFail: (errors, dispatch) => dispatch(focus('transactions', Object.keys(errors)[0]))
})(connect()(TransactionForm));