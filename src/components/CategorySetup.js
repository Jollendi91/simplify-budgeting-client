import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './CategorySetup.css';

export function CategorySetup(props) {

	let buttons;
	if (props.type === 'edit-profile') {
		buttons = <div className='buttons'>
					<Link to="/dashboard">
						<button type="submit">Save Changes</button>
					</Link>
				</div>
	} else {
		buttons = <div className='buttons'>
					<Link to="/">
						<button >Back</button>
					</Link>
					<Link to="/dashboard">
						<button type="submit">Finish Setup</button>
					</Link>
				</div>
	}

	let categories = props.categories.map((category, index) => 
			<tr key={index}>
				<td>{category.name}</td>
				<td>${category.amount}</td>
				<td>{Math.round(category.amount / (props.monthlySalary - props.billsTotal)* 10000)/100}%</td>
			</tr>)

    return (
        <section class="category-container">
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
					<p className="title">Remaining</p>
					<p> ${props.monthlySalary - props.billsTotal}</p>
				</div>
			</section>
            <form>
				<div>
					<label for="category-name">Name</label>
					<input type="text" name="category-name" id="category-name"/>
				</div>
				<div>
					<label for="current-total">Amount</label>
					<input type="number" name="allocation-percentage" id="allocation-percentage" min="1" max="100"/>
				</div>
				<button type="submit">Add Category</button>
            </form>
				<table>
					<thead>
						<tr>
							<th>Name</th>
                            <th>Amount</th>
							<th>Percentage</th>
						</tr>
					</thead>
					<tbody>
						{categories}
					</tbody>
				</table>
			{buttons}
		</section>
    )
}

const mapStateToProps = state => ({
	categories: state.categories,
	monthlySalary: state.monthlySalary,
	billsTotal: state.bills.reduce((accumulator, currentBill) => accumulator + currentBill.amount, 0)
})

export default connect(mapStateToProps)(CategorySetup);