import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {addTransaction} from '../actions/protected-data';

import {StyledInput, Button} from './styled-components/Forms';
import styled from 'styled-components';

// Styled Components
const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #276A73;
    color: white;
`;

const AddTransactionForm = styled.form`
    height: calc(100vh - 85px);
    background-color: white;
`;

const InputContainer = styled.div`
    padding: 10px 0;
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
                    <div className="form-inputs">
                        <InputContainer>
                            <StyledLabel htmlFor="transaction-name">Description</StyledLabel>
                            <Field
                                component={StyledInput}
                                type="text"
                                name="transaction"
                                id="transaction-name"
                                validate={[required, notEmpty]}
                            />
                        </InputContainer>
                        <InputContainer>
                            <StyledLabel htmlFor="transaction-date">Date</StyledLabel>
                            <Field 
                                component={StyledInput}
                                type="date"
                                name="date"
                                id="transaction-date"
                                validate={[required, notEmpty]}
                            />
                        </InputContainer>
                        <InputContainer>
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
                        </InputContainer>
                    </div>
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