import React from 'react';
import {connect} from 'react-redux';

export function MonthlyPaySetup(props) {
    let currentSalary;

    return (
        <section className="monthly-pay-container">
            <form className="monthly-pay-form">
                <div>
                    <label for="monthly-pay">What is your monthly salary?</label>
                    <input type="number" step="0.01" min="0" name="monthly-pay" id="monthly-pay" ref={input => currentSalary = input}/>
                </div>
            </form>
		</section>
    )
}

const mapStateToProps = state => ({
    monthlySalary: state.monthlySalary
})

export default connect(mapStateToProps)(MonthlyPaySetup); 