import React from 'react';
import {connect} from 'react-redux';

import MonthlyBillsForm from './MonthlyBillsForm';
import BillRow from './BillRow';

import {StyledTable, StyledTD, StyledTH, StyledTBody} from './styled-components/Tables';

export function MonthlyBillsSetup(props) {

    const bills = props.bills.map((bill)=> 
        <BillRow key={bill.id} form={`bill-${bill.id}-update`}{...bill} />
    );

    return (
        <section className="monthly-bills-form-container">
            <p>Enter all expenses that recur each month</p>
            <MonthlyBillsForm />
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
                        <StyledTD>Total</StyledTD>
                        <StyledTD colSpan="2">${props.billsTotal.toFixed(2)}</StyledTD>
                    </tr>
                </tfoot>
			</StyledTable>
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