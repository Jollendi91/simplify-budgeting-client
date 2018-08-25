import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {deleteBill, updateBill} from '../actions/protected-data';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {StyledInput} from './styled-components/Forms';
import {StyledTD} from './styled-components/Tables';


// Styled Components

const UpdateBillForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .form-input-container {
        width: 24%;
    }

    .form-input {
        display: inline-block;
        width: 100%;
    }

    .bill-amount-input {
        display: flex;
        align-items: center;
    }
`;
UpdateBillForm.displayName='UpdateBillForm';

const SetupInput = StyledInput.extend`
    padding: 0;

   input {
       font-size: 1em;
       padding: 2px;
       margin-top: 0;
   }
`;

const StyledIcon = styled(FontAwesomeIcon)`
   margin: 0 8px;
   color: ${props => props.color ? props.color : 'black'};
`;

const SubmitButton = styled.button`
   border: none;
   padding: 2px;
   background-color: transparent;
`;

export class BillRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
        }
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    onSubmit(values) {
        const {bill, amount} = values;
        this.props.dispatch(updateBill(this.props.id, bill, amount)).then(() => this.setEditing()); 
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

        if (this.state.editing) {
            return (
                <tr>
                    <StyledTD className="table-form-container" colSpan="3">
                        <UpdateBillForm form={this.props.form} onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                            {errorMessage}
                            <div className="form-input-container">
                                <Field 
                                    component={SetupInput}
                                    type="text"
                                    name="bill"
                                    id="bill-update"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="form-input-container bill-amount-input">
                                $<Field
                                    component={SetupInput}
                                    type="number"
                                    name="amount"
                                    id="amount-update"
                                    step="0.01"
                                    min="0.01"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="edit-buttons">
                                
                                <SubmitButton className="update-button" type="submit" disabled={this.props.pristine || this.props.submitting}><StyledIcon icon={['far', 'save']} color='#276A73' /></SubmitButton>
                                <StyledIcon className='cancel-button' icon='times' color='#FF5A5F' onClick={() => this.setEditing()}/>
                            </div>
                        </UpdateBillForm>
                    </StyledTD>
                </tr> 
            )
        } else {

        return (
            <tr>
                <StyledTD>{this.props.bill}</StyledTD>
                <StyledTD>${parseFloat(this.props.amount).toFixed(2)}</StyledTD>
                <StyledTD className="edit-buttons">
                    <StyledIcon className='edit-button' icon={['far','edit']} color='#276A73' onClick={() => this.setEditing()}/>
                    <StyledIcon className='delete-button' icon={['far','trash-alt']} color='#FF5A5F' onClick={() => this.props.dispatch(deleteBill(this.props.id))}/>
                </StyledTD>
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
  })(BillRow));