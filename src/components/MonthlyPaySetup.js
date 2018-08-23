import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import { updateSalary, updateStep } from '../actions/protected-data';
import Input from './input';
import styled from 'styled-components';


const StyledInput = styled(Input)`
max-width: 350px;
padding: 5px;
margin: 0 auto 10px;

label {
    text-align: left;
    font-size: 1em;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    max-width: 100%;
    width: 100%;
    padding: 5px;
    border: 0;
    border-bottom: 1px solid #aaa;
    font-size: 18px;
    margin-top: 5px;
}
`;

const SetupInput = StyledInput.extend`
    max-width: 300px;
    input {
        text-align: center;
        border-radius: 5px;
    }
`;

const Button = styled.button`
    padding: .6em 5em;
    font-size: .8em;
    margin-top: 1em;
    cursor: pointer;
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