import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import { setupUserSalary } from '../actions/protected-data';

export class MonthlyPaySetup extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(setupUserSalary(values.monthlySalary, 2));
    }

    render() {
        return (
            <section className="monthly-pay-container">
                <form className="monthly-pay-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <label for="monthly-pay">What is your monthly take home pay?</label>
                    <Field
                        component={Input}
                        type="number"
                        name="monthlySalary"
                        id="monthly-salary"
                        validate={[required, notEmpty]}
                    />
                    <button disabled={this.props.pristine || this.props.submitting}>Next</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    monthlySalary: state.simplify.user.monthlySalary
})

export default reduxForm({
    form: 'salary',
    onSubmitFail: (errors, dispatch) => dispatch(focus('monthlySalary', 'monthly-salary'))
  })(connect(mapStateToProps)(MonthlyPaySetup)); 