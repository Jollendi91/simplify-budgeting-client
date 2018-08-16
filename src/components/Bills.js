import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';
import BillRow from './BillRow';
import requiresLogin from './requiresLogin';
import MonthlyBillForm from './MonthlyBillsForm';
import {fetchProtectedUser} from '../actions/protected-data';

import './Bills.css';

export class Bills extends React.Component {
    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }

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
    userId: state.simplify.user.id,
    notLoaded: state.simplify.user.id === null
});

export default requiresLogin()(connect(mapStateToProps)(Bills));