import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';
import './Bills.css';
import { addBill, deleteBill } from '../actions';

export function Bills(props) {

    const bills = props.bills.map((bill, index)=> 
        <tr key={index}>
            <td>{bill.bill}</td>
            <td>${bill.amount.toFixed(2)}</td>
            <td className="edit-buttons">
                <button>Edit</button>
                <button onClick={() => props.dispatch(deleteBill(bill.id))}>X</button>
            </td>
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
        <div>
            <NavBar page={'dashboard'} />
            <main className='bills-container'>
                <header>
                    <h1>Monthly Bills</h1>
                    <h2>${props.billsTotal.toFixed(2)}/Month</h2>
                </header>
                <section class="monthly-bills-form-container">
                    <form className="add-bill-form" onSubmit={(event) => onSubmit(event)}>
                        <div>
                            <label for="description">Description</label>
                            <input type="text" name="description" placeholder="Rent, Utilities, etc." id="description" ref={input => billName = input}/>
                        </div>
                        <div>
                            <label for="amount">Amount</label>
                            <input type="number" step="0.01" name="amount" id="amount" min="0.01" ref={input => billAmount = input}/>
                        </div>
                        <button>Add Bill</button>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th colspan="2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills}
                        </tbody>
                        <tfoot>
                            <td>Total</td>
                            <td colspan="2">${props.billsTotal.toFixed(2)}</td>
                        </tfoot>
                    </table>
                </section>
            </main>
        </div>
    )
};


const mapStateToProps = state => ({
    bills: state.bills,
    billsTotal: state.bills.reduce((accumulator, currentBill) => accumulator + currentBill.amount, 0), 
    userId: state.user.id
});

export default connect(mapStateToProps)(Bills);