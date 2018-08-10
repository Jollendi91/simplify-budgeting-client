import React from 'react';
import {connect} from 'react-redux';

import MonthlyBillsForm from './MonthlyBillsForm';
import BillRow from './BillRow';

export function MonthlyBillsSetup(props) {

    const bills = props.bills.map((bill)=> 
        <BillRow key={bill.id} {...bill} />
    );

    return (
        <section className="monthly-bills-form-container">
            <h2>Monthly Bills</h2>
            <p>Enter all expenses that recur each month</p>
            <MonthlyBillsForm />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th colSpan="2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bills}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td colSpan="2">${props.billsTotal.toFixed(2)}</td>
                    </tr>
                </tfoot>
			</table>
		</section>
    )
}

const mapStateToProps = state => ({
    monthlySalary: state.simplify.user.monthlySalary,
    bills: state.simplify.user.bills,
    billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0),
    userId: state.simplify.user.id
});

export default connect(mapStateToProps)(MonthlyBillsSetup);