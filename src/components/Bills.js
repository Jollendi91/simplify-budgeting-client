import React from 'react';
import {connect} from 'react-redux';
import MainLoadingSpinner from './MainLoadingSpinner';
import BillRow from './BillRow';
import requiresLogin from './requiresLogin';
import MonthlyBillForm from './MonthlyBillsForm';
import {fetchProtectedUser} from '../actions/protected-data';

import styled from 'styled-components';
import {StyledTable, StyledTBody, StyledTH, StyledTD} from './styled-components/Tables';
import {HeaderContainer, ComponentContainer} from './styled-components/Elements';

// Styled Component

const BillsTotal = styled.div`
    padding: 15px;
    font-size: 2em;
`;

export class Bills extends React.Component {
    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }

    render() {
        if (this.props.notLoaded) {
            return (
                <MainLoadingSpinner />
            );
        }

        const bills = this.props.bills.map(bill => 
            <BillRow key={bill.id} {...bill} form={`bill-${bill.id}-update`}/>
        );

        return (
            <ComponentContainer>
                <HeaderContainer>
                    <h2>Monthly Bills</h2>
                </HeaderContainer>
                <BillsTotal>
                    <h3>Total Bills: ${this.props.billsTotal.toFixed(2)}</h3>
                </BillsTotal>
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