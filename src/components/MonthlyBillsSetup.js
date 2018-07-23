import React from 'react';
import {connect} from 'react-redux';

export function MonthlyBillsSetup(props) {

    const bills = props.bills.map(bill => 
        <tr>
            <td>{bill.name}</td>
            <td>${bill.amount}</td>
        </tr>
    );

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
                    {bills}
                </tbody>
                <tfoot>
                <td>Total</td>
                <td>${props.billsTotal}</td>
                </tfoot>
			</table>
		</section>
    )
}

const mapStateToProps = state => ({
    monthlySalary: state.monthlySalary,
    bills: state.bills,
    billsTotal: state.bills.reduce((accumulator, currentBill) => accumulator + currentBill.amount, 0)
});

export default connect(mapStateToProps)(MonthlyBillsSetup);