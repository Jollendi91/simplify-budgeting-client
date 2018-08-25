import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {deleteBill, updateBill} from '../actions/protected-data';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {UpdateInput} from './styled-components/Forms';
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
                                    component={UpdateInput}
                                    type="text"
                                    name="bill"
                                    id="bill-update"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="form-input-container bill-amount-input">
                                $<Field
                                    component={UpdateInput}
                                    type="number"
                                    name="amount"
                                    id="amount-update"
                                    step="0.01"
                                    min="0.01"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="edit-buttons">
                                
                                <SubmitButton className="update-button" type="submit" disabled={this.props.pristine || this.props.submitting}><StyledIcon icon={['far', 'save']} color='#4ABDAC' /></SubmitButton>
                                <StyledIcon className='cancel-button' icon='times' color='#FC4A1A' onClick={() => this.setEditing()}/>
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
                    <StyledIcon className='edit-button' icon={['far','edit']} color='#4ABDAC' onClick={() => this.setEditing()}/>
                    <StyledIcon className='delete-button' icon={['far','trash-alt']} color='#FC4A1A' onClick={() => this.props.dispatch(deleteBill(this.props.id))}/>
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