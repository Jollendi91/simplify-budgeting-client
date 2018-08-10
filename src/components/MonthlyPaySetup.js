import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import { updateSalary, updateStep } from '../actions/protected-data';

export class MonthlyPaySetup extends React.Component {
    onSubmit(values) {
        return (
            this.props.dispatch(updateSalary(values.monthlySalary)),
            this.props.dispatch(updateStep(2))
        )
    }

    render() {
        return (
            <section className="monthly-pay-container">
                <form className="monthly-pay-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <label htmlFor="monthly-salary">What is your monthly take home pay?</label>
                    <Field
                        component={Input}
                        type="number"
                        name="monthlySalary"
                        id="monthly-salary"
                        step='0.01'
                        min="0.01"
                        validate={[required, notEmpty]}
                    />
                    <button disabled={this.props.pristine || this.props.submitting}>Next</button>
                </form>
            </section>
        )
    }
}

export default reduxForm({
    form: 'salary',
    onSubmitFail: (errors, dispatch) => dispatch(focus('monthlySalary', 'monthly-salary'))
  })(connect()(MonthlyPaySetup)); 