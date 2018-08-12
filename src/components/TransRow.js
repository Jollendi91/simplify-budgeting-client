import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';

import { deleteTransaction, updateTransaction } from '../actions/protected-data';

import './TransRow.css';

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

    render() {
        if (this.state.editing) {
            return (
                <tr>
                    <td className="transaction-form-container" colSpan="4">
                        <form className="update-transaction-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                            <div className="form-input-container">
                                <Field 
                                    component={Input}
                                    type="text"
                                    name="transaction"
                                    id="transaction-update"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="form-input-container">
                                <Field
                                    component={Input}
                                    type="date"
                                    name="date"
                                    id="transaction-date-update"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="form-input-container transaction-amount-input">
                                $<Field
                                    component={Input}
                                    type="number"
                                    name="amount"
                                    id="transaction-amount-update"
                                    min="0.01"
                                    step="0.01"
                                    validate={[required, notEmpty]}
                                />
                            </div>
                            <div className="edit-buttons">
                                <button type="submit" disabled={this.props.pristine || this.props.submitting}>Update</button>
                                <button onClick={() => this.setEditing()}>Cancel</button>
                            </div>
                        </form>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.transaction}</td>
                    <td>{this.props.date}</td>
                    <td>${parseFloat(this.props.amount).toFixed(2)}</td>
                    <td className="edit-buttons">
                        <button onClick={() => this.setEditing()}>Edit</button>
                        <button onClick={() => this.props.dispatch(deleteTransaction(this.props.id, this.props.categoryId))}>X</button>
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
  })(TransRow));