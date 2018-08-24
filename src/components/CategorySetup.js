import React from 'react';
import {connect} from 'react-redux';

import CategoryForm from './CategoryForm';
import CatRow from './CatRow';

import styled from 'styled-components';
import {StyledTable, StyledTH, StyledTBody} from './styled-components/Tables';
import './CategorySetup.css';

// Styled Components
const StatsContainer = styled.div`
	text-align: center;
	display: flex;
    justify-content: center;
	align-items: flex-end;
	
	p {
		margin: 0;
	}
`;

const Title = styled.p`
	color: white;
	font-weight: bold;
	background-color: ${props => props.bgColor ? props.bgColor : 'white'};
	padding: 2px 15px;
`;

const Amount = styled.p`
`;

const CategoryTH = StyledTH.extend`
	width: 24%;
`;

export function CategorySetup(props) {

	let remainingAmount = (props.monthlySalary - props.billsTotal) - props.categoriesTotal;

	let categories = props.categories.map((category) => 
		<CatRow key={category.id} {...category} max={remainingAmount} form={`category-${category.id}-update`}/>
			)

    return (
        <section className="category-container">
            <p>Set up some budgets that you would like to track, such as spending, savings, or debts.</p>
			<p>How would you like to allocate the remaining amount?</p>
			<CategoryForm max={remainingAmount}/>
			<StatsContainer>
				<div>
					<Title bgColor="#043B40">Discretionary</Title>
					<Amount>${props.monthlySalary - props.billsTotal.toFixed(2)}</Amount> 
				</div>
				<div>
					<Title bgColor="#276A73">Budgeted</Title>
					<Amount>${props.categoriesTotal.toFixed(2)}</Amount>
				</div>
				<div>
					<Title bgColor="#20A69A">Remaining</Title>
					<Amount>${remainingAmount.toFixed(2)}</Amount>
				</div>
			</StatsContainer>
			<StyledTable>
				<thead>
					<tr>
						<CategoryTH>Name</CategoryTH>
						<CategoryTH>Amount</CategoryTH>
						<CategoryTH colSpan="2"></CategoryTH>
					</tr>
				</thead>
				<StyledTBody>
					{categories}
				</StyledTBody>
			</StyledTable>
		</section>
    )
}

const mapStateToProps = state => ({
	categories: state.simplify.user.categories,
	categoriesTotal: state.simplify.user.categories.reduce((accumulator, currentCategory) => accumulator + parseFloat(currentCategory.amount), 0),
	monthlySalary: state.simplify.user.monthlySalary,
	billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0),
	userId: state.simplify.user.id
});

export default connect(mapStateToProps)(CategorySetup);