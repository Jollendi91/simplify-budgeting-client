import React from 'react';
import {connect} from 'react-redux';
import ProgressBar from 'react-progress-bar.js';
import CategoryForm from './CategoryForm';
import CatRow from './CatRow';
import styled from 'styled-components';
import {StyledTable, StyledTH, StyledTBody} from './styled-components/Tables';

// Styled Components
const CategoryFormContainer = styled.section`
	flex-grow: 1;
`;

const Description = styled.p`
    font-size: 1.1em;
    margin: 10px 0;
    padding: 0 10px;
`;

const AmountRemaining = styled.p`
	width: 80%;
	text-align: right;
	margin: auto;
`;

const CategoryTH = StyledTH.extend`
	width: 24%;
`;

const ProgressContainer = styled.div`
	margin: 25px 0;
`;

const NoCategoryRow = styled.td`
    padding: 30px 0;
    text-align: center;
`;

//Progress Bar configuration
const Bar = ProgressBar.Line;

const options = {
	strokeWidth: 1,
	color: '#F7B733',
	trailColor: '#DEDCE3',
	easing: 'easeOut',
	svgStyle: {
		display: 'block',
		width: '100%',
		height: '100%',
		borderRadius: '5px'
	},
	text: {
		style: {
			width: '100%',
			color: '#000',
			fontWeight: 'bold',
			position: 'absolute',
			left: '50%',
			top: '50%',
			padding: 0,
			margin: 0,
			transform: {
				prefix: true,
				value: 'translate(-50%, -50%)'
			}
		}
	}
};

const containerStyle = {
	width: '80%',
	height: '30px',
	margin: 'auto'
};

// Category Setup Component
export function CategorySetup(props) {

	let remainingAmount = (props.monthlySalary - props.billsTotal) - props.categoriesTotal;

	let categories = props.categories.map((category) => 
		<CatRow 
			key={category.id} 
			max={remainingAmount} 
			form={`category-${category.id}-update`}
			{...category}
		/>
	);

    return (
        <CategoryFormContainer>
            <Description>Set up some budgets that you would like to track, such as spending, savings, or debts.</Description>
			<ProgressContainer>
				<AmountRemaining>{`$${remainingAmount.toFixed(2)} Left`}</AmountRemaining>
				<Bar
					progress={props.categoriesTotal.toFixed(2) / (props.monthlySalary - props.billsTotal.toFixed(2))}
					text={`$${props.categoriesTotal.toFixed()} of $${(props.monthlySalary - props.billsTotal).toFixed(2)}`}
					options={options}
					initialAnimate={true}
					containerStyle={containerStyle}
					containerClassName={'.progressbar'}
				/>
			</ProgressContainer>
			<CategoryForm max={remainingAmount}/>
			<StyledTable>
				<thead>
					<tr>
						<CategoryTH>Name</CategoryTH>
						<CategoryTH>Amount</CategoryTH>
						<CategoryTH colSpan="2"></CategoryTH>
					</tr>
				</thead>
				<StyledTBody>
					{categories.length > 0 ? categories : <tr> <NoCategoryRow colSpan="3"> You have not added any budgets</NoCategoryRow></tr>}
				</StyledTBody>
			</StyledTable>
		</CategoryFormContainer>
    );
};

const mapStateToProps = state => ({
	categories: state.simplify.user.categories,
	categoriesTotal: state.simplify.user.categories.reduce((accumulator, currentCategory) => 
		accumulator + parseFloat(currentCategory.amount), 0
	),
	monthlySalary: state.simplify.user.monthlySalary,
	billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => 
		accumulator + parseFloat(currentBill.amount), 0
	),
	userId: state.simplify.user.id
});

export default connect(mapStateToProps)(CategorySetup);