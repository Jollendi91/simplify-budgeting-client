import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {deleteBill, updateBill} from '../actions/protected-data';

import './BillRow.css';

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
                        <form className="update-bill-form" form={this.props.form} onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                            {errorMessage}
                            <div className="form-input-container">
                                <Field 
                                    component={Input}
                                    type="text"
                                    name="bill"
                                    id="bill-update"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="form-input-container bill-amount-input">
                                $<Field
                                    component={Input}
                                    type="number"
                                    name="amount"
                                    id="amount-update"
                                    step="0.01"
                                    min="0.01"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="edit-buttons">
                                <button className="update-button" type="submit" disabled={this.props.pristine || this.props.submitting}>Update</button>
                                <button className="cancel-button" type="button" onClick={() => this.setEditing()}>Cancel</button>
                            </div>
                        </form>
                    </td>
                </tr> 
            )
        } else {

        return (
            <tr>
                <td>{this.props.bill}</td>
                <td>${parseFloat(this.props.amount).toFixed(2)}</td>
                <td className="edit-buttons">
                    <button className="edit-button" onClick={() => this.setEditing()}>Edit</button>
                    <button className="delete-button" onClick={() => this.props.dispatch(deleteBill(this.props.id))}>X</button>
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