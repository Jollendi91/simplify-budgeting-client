import React from 'react';

import {connect} from 'react-redux';

import CategoryForm from './CategoryForm';
import CatRow from './CatRow';

import './CategorySetup.css';




export function CategorySetup(props) {

	let remainingAmount = (props.monthlySalary - props.billsTotal) - props.categoriesTotal;

	let categories = props.categories.map((category, index) => 
		<CatRow key={index} {...category} remainingAmount={remainingAmount}/>
			)

    return (
        <section className="category-container">
			<h2>Categories</h2>
            <p>Set up some categories that you would like to budget for, such as spending, savings, or debts.</p>
            <p>How would you like to budget the remaining amount?</p>
			<section className="remaining-calc">
				<div>
					<p className="title">Salary</p>
					<p>${props.monthlySalary}</p> 
				</div>
				<p> - </p>
				<div>
					<p className="title">Bills</p>
					<p>${props.billsTotal}</p>
				</div>
				<p> = </p>
				<div>
					<p> ${props.monthlySalary - props.billsTotal}</p>
				</div>
			</section>
			<section className="remaining-calc">
				<div>
					<p className="title">Remaining</p>
					<p>${remainingAmount.toFixed(2)}</p>
				</div>
				<div>
					<p className="title">Budgeted</p>
					<p>${props.categoriesTotal.toFixed(2)}</p>
				</div>
			</section>
            <CategoryForm/>
			<table className="categories-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Amount</th>
						<th colSpan="2">Percentage</th>
					</tr>
				</thead>
				<tbody>
					{categories}
				</tbody>
			</table>
		</section>
    )
}

const mapStateToProps = state => {
	return {
		categories: state.simplify.user.categories,
		categoriesTotal: state.simplify.user.categories.reduce((accumulator, currentCategory) => accumulator + currentCategory.amount, 0),
		monthlySalary: state.simplify.user.monthlySalary,
		billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0),
		userId: state.simplify.user.id
	}
}

export default connect(mapStateToProps)(CategorySetup);