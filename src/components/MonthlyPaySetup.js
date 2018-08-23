import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import { updateSalary, updateStep } from '../actions/protected-data';
import Input from './input';
import styled from 'styled-components';
import {StyledInput, Button} from './styled-components/Forms';

const SetupInput = StyledInput.extend`
    max-width: 300px;
    input {
        text-align: center;
        border-radius: 5px;
    }
`;

const StyledLabel = styled.label`
    font-size: 1.3em;
    padding: 0 10px;
`;

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
                    <StyledLabel htmlFor="monthly-salary">What is your monthly take home pay?</StyledLabel>
                    <Field
                        component={Input}
                        type="number"
                        name="monthlySalary"
                        id="monthly-salary"
                        step='0.01'
                        min="0.01"
                        validate={[required, notEmpty]}
                    />
                    <Button disabled={this.props.pristine || this.props.submitting}>Next</Button>
                </form>
            </section>
        )
    }
}

export default reduxForm({
    form: 'salary',
    onSubmitFail: (errors, dispatch) => dispatch(focus('monthlySalary', 'monthly-salary'))
  })(connect()(MonthlyPaySetup)); 