import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {deleteBill, updateBill} from '../actions/protected-data';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './BillRow.css';
import {StyledInput} from './styled-components/Forms';

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
    }
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
                    <td className="table-form-container" colSpan="3">
                        <UpdateBillForm form={this.props.form} onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                            {errorMessage}
                            <div className="form-input-container">
                                <Field 
                                    component={StyledInput}
                                    type="text"
                                    name="bill"
                                    id="bill-update"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="form-input-container bill-amount-input">
                                $<Field
                                    component={StyledInput}
                                    type="number"
                                    name="amount"
                                    id="amount-update"
                                    step="0.01"
                                    min="0.01"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="edit-buttons">
                                
                                <button className="update-button" type="submit" disabled={this.props.pristine || this.props.submitting}><FontAwesomeIcon icon={['far', 'save']} /></button>
                                <FontAwesomeIcon icon='times' className="cancel-button" onClick={() => this.setEditing()}/>
                            </div>
                        </UpdateBillForm>
                    </td>
                </tr> 
            )
        } else {

        return (
            <tr>
                <td>{this.props.bill}</td>
                <td>${parseFloat(this.props.amount).toFixed(2)}</td>
                <td className="edit-buttons">
                    <FontAwesomeIcon icon={['far','edit']} className="edit-button" onClick={() => this.setEditing()}/>
                    <FontAwesomeIcon icon={['far','trash-alt']} className="delete-button" onClick={() => this.props.dispatch(deleteBill(this.props.id))}/>
                </td>
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