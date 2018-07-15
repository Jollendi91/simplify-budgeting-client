import React from 'react';

export default function MonthlyBillsSetup(props) {
    return (
        <section className="monthly-bills-form-container">
            <h2>Monthly Bills</h2>
            <form>
                <div>
                    <label for="description">Description</label>
                    <input type="text" name="description" placeholder="Rent, Utilities, etc." id="description"/>
                </div>
                <div>
                    <label for="amount">Amount</label>
                    <input type="number" step="0.01" name="amount" id="amount" min="0.01"/>
                </div>
                <button>Add Bill</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Rent</td>
                        <td>$450.00</td>
                    </tr>
                    <tr>
                        <td>Electricity</td>
                        <td>$70.00</td>
                    </tr>
                </tbody>
                <tfoot>
                <td>Total</td>
                <td>$520.00</td>
                </tfoot>
			</table>
		</section>
    )
}