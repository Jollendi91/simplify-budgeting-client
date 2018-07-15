import React from 'react';

export default function MonthlyPaySetup(props) {
    return (
        <section className="monthly-pay-container">
            <form className="monthly-pay-form">
                <div>
                    <label for="monthly-pay">What is your monthly pay?</label>
                    <input type="number" step="0.01" min="0" name="monthly-pay" id="monthly-pay" />
                </div>
            </form>
		</section>
    )
}