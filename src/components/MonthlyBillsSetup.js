import React from 'react';
import {connect} from 'react-redux';
import { addBill } from '../actions';

export function MonthlyBillsSetup(props) {

    const bills = props.bills.map((bill, index)=> 
        <tr key={index}>
            <td>{bill.bill}</td>
            <td>${bill.amount.toFixed(2)}</td>
        </tr>
    );

    let billName;
    let billAmount;

    function onSubmit(event) {
        event.preventDefault();
        props.dispatch(addBill(billName.value, parseFloat(billAmount.value), props.userId));

        billName.value = '';
        billAmount.value = '';
    }

    return (
        <section className="monthly-bills-form-container">
            <h2>Monthly Bills</h2>
            <form className="add-bill-form" onSubmit={(event) => onSubmit(event)}>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" placeholder="Rent, Utilities, etc." id="description" ref={input => billName = input}/>
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" step="0.01" name="amount" id="amount" min="0.01" ref={input => billAmount = input}/>
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
                    <tr>
                        <td>Total</td>
                        <td>${props.billsTotal.toFixed(2)}</td>
                    </tr>
                </tfoot>
			</table>
		</section>
    )
}

const mapStateToProps = state => ({
    monthlySalary: state.monthlySalary,
    bills: state.bills,
    billsTotal: state.bills.reduce((accumulator, currentBill) => accumulator + currentBill.amount, 0),
    userId: state.user.id
});

export default connect(mapStateToProps)(MonthlyBillsSetup);