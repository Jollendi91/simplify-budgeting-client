import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';
import BillRow from './BillRow';
import requiresLogin from './requiresLogin';
import MonthlyBillForm from './MonthlyBillsForm';
import {fetchProtectedUser} from '../actions/protected-data';

import {StyledTable, StyledTBody, StyledTH, StyledTD} from './styled-components/Tables';
import {HeaderContainer, ComponentContainer} from './styled-components/Elements';

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
            <ComponentContainer>
                <HeaderContainer>
                    <h2>Monthly Bills</h2>
                </HeaderContainer>
                <section class="monthly-bills-form-container">
                    <MonthlyBillForm />
                    <StyledTable>
                        <thead>
                            <tr>
                                <StyledTH>Name</StyledTH>
                                <StyledTH colSpan="2">Amount</StyledTH>
                            </tr>
                        </thead>
                        <StyledTBody>
                            {bills}
                        </StyledTBody>
                        <tfoot>
                            <tr>
                                <StyledTH>Total</StyledTH>
                                <StyledTH colSpan="2">${this.props.billsTotal.toFixed(2)}</StyledTH>
                            </tr>
                        </tfoot>
                    </StyledTable>
                </section>
            </ComponentContainer>
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