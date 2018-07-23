import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';
import './Bills.css';

export function Bills(props) {

    const bills = props.bills.map((bill, index)=> 
        <tr key={index}>
            <td>{bill.name}</td>
            <td>${bill.amount}</td>
            <td>X</td>
        </tr>
    );

    return (
        <div>
            <NavBar page={'dashboard'} />
            <main className='bills-container'>
                <header>
                    <h1>Monthly Bills</h1>
                    <h2>${props.billsTotal}/Month</h2>
                </header>
                <section class="monthly-bills-form-container">
                    <form>
                        <div>
                            <label for="description">Description</label>
                            <input type="text" name="description" placeholder="Rent, Utilities, etc." id="description" />
                        </div>
                        <div>
                            <label for="amount">Amount</label>
                            <input type="number" step="0.01" name="amount" id="amount" min="0.01" />
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
                            <td colspan="2">${props.billsTotal}</td>
                        </tfoot>
                    </table>
                </section>
            </main>
        </div>
    )
};


const mapStateToProps = state => ({
    bills: state.bills,
    billsTotal: state.bills.reduce((accumulator, currentBill) => accumulator + currentBill.amount, 0)
});

export default connect(mapStateToProps)(Bills);