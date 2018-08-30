import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';

import { deleteTransaction, updateTransaction } from '../actions/protected-data';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {UpdateInput} from './styled-components/Forms';
import {StyledTD} from './styled-components/Tables';

// Styled Components
const UpdateTransactionForm = styled.form`
    display: grid;
    grid-template-columns: 30% 30% 20% 10%;
    justify-content: space-between;
    align-items: center;

    .form-input {
        display: inline-block;
        width: 100%;
    }

    #date {
        font-size: .8em;
    }

    .transaction-amount-input {
        display: flex;
        align-items: center;
    }
`;
UpdateTransactionForm.displayName='UpdateTransactionForm';

const TransTD = StyledTD.extend`
    width: 24%;
`;

const StyledIcon = styled(FontAwesomeIcon)`
   margin: 0 8px;
   color: ${props => props.color ? props.color : 'black'};
`;

const EditButtons = styled.td`
    width: 10%;
    padding: 5px 0;

    @media screen and (min-width: 800px) {
        display: flex;
    }
`;

const IconButton = styled.button`
   border: none;
   background-color: transparent;
   cursor: pointer;
`;



export class TransRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    onSubmit(values) {
        const {transaction, date, amount} = values;
        return this.props.dispatch(updateTransaction(this.props.id, transaction, date, amount, this.props.categoryId)).then(() => this.setEditing());
    }

    render() {
        if (this.state.editing) {
            return (
                <tr>
                    <TransTD className="transaction-form-container" colSpan="4">
                        <UpdateTransactionForm onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                            <div className="form-input-container">
                                <Field 
                                    component={UpdateInput}
                                    type="text"
                                    name="transaction"
                                    id="transaction-update"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="form-input-container transcation-date-input">
                                <Field
                                    component={UpdateInput}
                                    type="date"
                                    name="date"
                                    id="transaction-date-update"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="form-input-container transaction-amount-input">
                                $<Field
                                    component={UpdateInput}
                                    type="number"
                                    name="amount"
                                    id="transaction-amount-update"
                                    min="0.01"
                                    step="0.01"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <EditButtons>
                                <IconButton type="submit" disabled={this.props.pristine || this.props.submitting}><StyledIcon icon={['far', 'save']} color='#4ABDAC' /></IconButton>
                                <IconButton className="cancel-button" onClick={() => this.setEditing()}><StyledIcon icon='times' color='#FC4A1A' /></IconButton>
                            </EditButtons>
                        </UpdateTransactionForm>
                    </TransTD>
                </tr>
            )
        } else {
            return (
                <tr>
                    <TransTD>{this.props.transaction}</TransTD>
                    <TransTD>{moment(this.props.date).format('M/D/YY')}</TransTD>
                    <TransTD>${parseFloat(this.props.amount).toFixed(2)}</TransTD>
                    <EditButtons>
                        <IconButton className="edit-button" onClick={() => this.setEditing()}><StyledIcon icon={['far','edit']} color='#4ABDAC'/></IconButton>
                        <IconButton className="delete-button" onClick={() => this.props.dispatch(deleteTransaction(this.props.id, this.props.categoryId))}><StyledIcon icon={['far','trash-alt']} color='#FC4A1A' /></IconButton>
                    </EditButtons>
                </tr>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    initialValues: props
});

export default connect(mapStateToProps)(reduxForm({
    onSubmitFail: (errors, dispatch, submitError, props) => dispatch(focus(props.form, Object.keys(errors)[0]))
  })(TransRow));