import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {addTransaction} from '../actions/protected-data';

import {StyledInput, Button, HorizontalInputs} from './styled-components/Forms';
import styled from 'styled-components';

// Styled Components
const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #276A73;
    color: white;

    @media screen and (min-width: 800px) {
        display: none;
    }
`;

const AddTransactionForm = styled.form`
    height: calc(100vh - 66px);
    background-color: white;

    @media screen and (min-width: 800px) {
        height: auto;
        width: 90%;
        margin: auto;
        display: flex;

        .inputs {
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            input {
                padding: 4px;
            }

            #date {
                padding: 0;
            }
        }
    }
`;

const StyledLabel = styled.label`
    font-size: 1.2em;
`;

const ButtonContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 44px;

    @media screen and (min-width: 800px) {
        position: initial;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 0;
        margin-top: 15px;
    }
`;

export class TransactionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayTransactionForm: false
        }
    }

    onSubmit(values) {
        const {transaction, date, amount} = values;
        this.props.dispatch(addTransaction(transaction, date, amount, this.props.categoryId)).then(() => this.props.reset()).then(() => this.setDisplayForm());
    } 

    setDisplayForm() {
        this.setState({
            displayTransactionForm: !this.state.displayTransactionForm
        });
    }

    render() {
        if (this.state.displayTransactionForm) {
            return (
                <AddTransactionForm onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <HeaderContainer>
                        <h2>Add a Transaction</h2>
                    </HeaderContainer>
                    <HorizontalInputs className="inputs">
                        <div className="form-input-container">
                            <StyledLabel htmlFor="transaction-name">Description</StyledLabel>
                            <Field
                                component={StyledInput}
                                type="text"
                                name="transaction"
                                id="transaction-name"
                                validate={[required, notEmpty]}
                            />
                        </div>
                        <div className="form-input-container">
                            <StyledLabel htmlFor="transaction-date">Date</StyledLabel>
                            <Field 
                                component={StyledInput}
                                type="date"
                                name="date"
                                id="transaction-date"
                                validate={[required, notEmpty]}
                            />
                        </div>
                        <div className="form-input-container">
                            <StyledLabel htmlFor="transaction-amount">Amount</StyledLabel>
                            <Field
                                component={StyledInput}
                                type="number"
                                name="amount"
                                id="transaction-amount"
                                min="0.01"
                                step="0.01"
                                validate={[required, notEmpty]}
                            />
                        </div>
                    </HorizontalInputs>
                    <ButtonContainer>
                        <Button color="#276A73" disabled={this.props.pristine || this.props.submitting}>Submit</Button>
                        <Button primary color="#276A73" onClick={() => this.setDisplayForm()}>Cancel</Button>
                    </ButtonContainer>
                </AddTransactionForm>
            )
        } else {
            return (
                <ButtonContainer>
                    <Button color="#276A73" onClick={() => this.setDisplayForm()}>Add Transaction</Button>
                </ButtonContainer>
            )
        }
    }
}

export default reduxForm({
    form: 'transactions',
    onSubmitFail: (errors, dispatch) => dispatch(focus('transactions', Object.keys(errors)[0]))
})(connect()(TransactionForm));