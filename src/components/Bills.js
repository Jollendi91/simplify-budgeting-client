import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';
import './Bills.css';
import BillRow from './BillRow';
import { addBill, deleteBill } from '../actions/protected-data';
import requiresLogin from './requiresLogin';
import MonthlyBillForm from './MonthlyBillsForm';

export class Bills extends React.Component {

    render() {
        const bills = this.props.bills.map(bill => 
            <BillRow key={bill.id} {...bill} form={`bill-${bill.id}-update`}/>
        );

        return (
            <div>
                <NavBar page={'dashboard'} />
                <main className='bills-container'>
                    <header>
                        <h1>Monthly Bills</h1>
                        <h2>${parseFloat(this.props.billsTotal).toFixed(2)}/Month</h2>
                    </header>
                    <section class="monthly-bills-form-container">
                        <MonthlyBillForm />
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
                                <td colspan="2">${parseFloat(this.props.billsTotal).toFixed(2)}</td>
                            </tfoot>
                        </table>
                    </section>
                </main>
            </div>
        )
    }
};


const mapStateToProps = state => ({
    bills: state.simplify.user.bills,
    billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0), 
    userId: state.simplify.user.id
});

export default requiresLogin()(connect(mapStateToProps)(Bills));