import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './CategorySetup.css';
import { addCategory } from '../actions';
import CatRow from './CatRow';


export function CategorySetup(props) {
	let buttonDisabled;
	let remainingAmount = (props.monthlySalary - props.billsTotal) - props.categoriesTotal;

	if (remainingAmount <= 0) {
		buttonDisabled = true;
	} else {
		buttonDisabled = false;
	}


	let categoryName;
	let categoryAmount;

	function onSubmit(event) {
		event.preventDefault();
		props.dispatch(addCategory(categoryName.value, parseFloat(categoryAmount.value), props.userId));

		categoryName.value = '';
		categoryAmount.value = '';
	}

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
            <form className="add-category-form" onSubmit={(event) => onSubmit(event)}>
				<div>
					<label htmlFor="category-name">Name</label>
					<input type="text" name="category-name" id="category-name" ref={input => categoryName = input}/>
				</div>
				<div>
					<label htmlFor="current-total">Amount</label>
					<input type="number" name="allocation-amount" id="allocation-amount" min="1"  max={remainingAmount} ref={input => categoryAmount = input}/>
				</div>
				<button type="submit" disabled={buttonDisabled}>Add Category</button>
            </form>
				<table className="categories-table">
					<thead>
						<tr>
							<th>Name</th>
                            <th>Amount</th>
							<th colspan="2">Percentage</th>
						</tr>
					</thead>
					<tbody>
						{categories}
					</tbody>
				</table>
		</section>
    )
}

const mapStateToProps = state => ({
	categories: state.categories,
	categoriesTotal: state.categories.reduce((accumulator, currentCategory) => accumulator + currentCategory.amount, 0),
	monthlySalary: state.monthlySalary,
	billsTotal: state.bills.reduce((accumulator, currentBill) => accumulator + currentBill.amount, 0),
	userId: state.user.id
})

export default connect(mapStateToProps)(CategorySetup);