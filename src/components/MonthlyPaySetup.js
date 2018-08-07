import React from 'react';
import {connect} from 'react-redux';
import { updateSalary, setupStep } from '../actions';

export function MonthlyPaySetup(props) {
    let currentSalary;
    
    function setSalaryAndNextStep(salary) {
        props.dispatch(updateSalary(salary));
        props.dispatch(setupStep(2));
    }

    return (
        <section className="monthly-pay-container">
            <form className="monthly-pay-form">
                <div>
                    <label for="monthly-pay">What is your monthly take home pay?</label>
                    <input type="number" step="0.01" min="0" name="monthly-pay" id="monthly-pay" ref={input => currentSalary = input} required="true"/>
                </div>
                <button onClick={() => setSalaryAndNextStep(currentSalary.value)}>Next</button>
            </form>
		</section>
    )
}

const mapStateToProps = state => ({
    monthlySalary: state.simplify.user.monthlySalary
})

export default connect(mapStateToProps)(MonthlyPaySetup); 