import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import { updateSalary } from '../actions/protected-data';
import {SetupInput, Button} from './styled-components/Forms';

export class MonthlyPayEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            editing: false
        }
    }

    onSubmit(values) {
        const {monthlySalary} = values;

         return this.props.dispatch(updateSalary(monthlySalary)).then(() => this.setEditing());
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    render() {
        let salaryForm;
        if (!this.state.editing) {
            salaryForm = <div>
                            <Button color="#276A73" className="edit-button" onClick={() => this.setEditing()}>Edit Pay</Button>
                        </div>
        } else {
            salaryForm = 
            <form className="update-salary-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                <Field
                    component={SetupInput}
                    type="number"
                    name="monthlySalary"
                    id="monthly-salary"
                    step="0.01"
                    min={this.props.categoriesTotal + this.props.billsTotal}
                    validate={[required, notEmpty]}
                />
                <div>
                    <Button color="#276A73" className="update-button" type="submit" disabled={this.props.pristine || this.props.submitting}>Update</Button>
                    <Button primary color="#276A73" className="cancel-button" onClick={() => this.setEditing()}>Cancel</Button>
                </div>
            </form>
        }

        return (
            <section className="monthly-pay-container">
                <h2>Take Home Pay</h2>
                <section className="salary-container">
                    <div>
                       <p>Current monthly take home pay:  
                           <span> ${this.props.monthlySalary}</span></p>
                    </div>
                    {salaryForm}
                </section>
            </section>
        )
    }
};

const mapStateToProps = state => ({
    categoriesTotal: state.simplify.user.categories.reduce((accumulator, currentCategory) => accumulator + parseFloat(currentCategory.amount), 0),
    billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0),
    monthlySalary: state.simplify.user.monthlySalary
})

export default reduxForm({
    form: 'monthly-salary',
    onSubmitFail: (errors, dispatch) =>
    dispatch(focus('monthly-salary', Object.keys(errors)[0]))
})(connect(mapStateToProps)(MonthlyPayEdit)); 