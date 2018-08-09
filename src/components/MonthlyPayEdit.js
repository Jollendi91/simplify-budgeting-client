import React from 'react';
import {connect} from 'react-redux';

import './MonthlyPayEdit.css';
import { updateSalary } from '../actions/protected-data';

export class MonthlyPayEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            editing: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const salary = this.salaryInput.value.trim();
        if(salary) {
            this.props.dispatch(updateSalary(salary));
        }

        this.salaryInput.value = '';
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
                            <button onClick={() => this.setEditing()}>Edit Pay</button>
                        </div>
        } else {
            salaryForm = 
            <form className="update-salary-form" onSubmit={this.onSubmit}>
                <input className="salaryInput" type="number" min="0" step="0.01" ref={input => this.salaryInput = input} require="true"/>
                <div>
                    <button type="submit">Update</button>
                    <button onClick={() => this.setEditing()}>Cancel</button>
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
    monthlySalary: state.simplify.user.monthlySalary
})

export default connect(mapStateToProps)(MonthlyPayEdit); 