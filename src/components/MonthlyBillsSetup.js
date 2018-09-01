import React from 'react';
import {connect} from 'react-redux';
import MonthlyBillsForm from './MonthlyBillsForm';
import BillRow from './BillRow';
import styled from 'styled-components';
import {StyledTable, StyledTH, StyledTBody} from './styled-components/Tables';

// Styled Components
const BillsFormContainer = styled.section`
    flex-grow: 1;
`;

const Description = styled.p`
    font-size: 1.1em;
    margin: 10px 0;
    padding: 0 10px;
`;

const NoBillRow = styled.td`
    padding: 30px 0;
    text-align: center;
`;

// Monthly Bill Setup Component
export function MonthlyBillsSetup(props) {

    const bills = props.bills.map((bill)=> 
        <BillRow 
            key={bill.id} 
            form={`bill-${bill.id}-update`}
            {...bill} 
        />
    );

    return (
        <BillsFormContainer>
            <Description>Enter all recurring monthly bills and expenses</Description>
            <MonthlyBillsForm />
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTH>Name</StyledTH>
                        <StyledTH colSpan="2">Amount</StyledTH>
                    </tr>
                </thead>
                <StyledTBody>
                    {bills.length > 0 ? bills : <tr> <NoBillRow colSpan="3"> You have not added any bills</NoBillRow></tr>}
                </StyledTBody>
                <tfoot>
                    <tr>
                        <StyledTH>Total</StyledTH>
                        <StyledTH colSpan="2">${props.billsTotal.toFixed(2)}</StyledTH>
                    </tr>
                </tfoot>
			</StyledTable>
		</BillsFormContainer>
    );
};

const mapStateToProps = state => ({
    monthlySalary: state.simplify.user.monthlySalary,
    bills: state.simplify.user.bills,
    billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => 
        accumulator + parseFloat(currentBill.amount), 0
    ),
    userId: state.simplify.user.id
});

export default connect(mapStateToProps)(MonthlyBillsSetup);