import React from 'react';

export default function CategorySetup(props) {
    return (
        <section class="category-container">
			<h3><span>Monthly Pay </span>-<span> Monthly Bills </span>=<span> Remaining</span></h3>
            <h2>Categories</h2>
            <p>Set up some categories that you would like to budget for, such as spending, savings, or debts.</p>
            <p>How would you like to budget the remaining amount?</p>
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
						<tr>
							<td>Spending Money</td>
							<td>$540</td>
                            <td>60%</td>
						</tr>
						<tr>
							<td>Savings</td>
                            <td>$180</td>
							<td>20%</td>							
						</tr>
						<tr>
							<td>Debts</td>
                            <td>$180</td>
							<td>20%</td>							
						</tr>
					</tbody>
				</table>
            <button>Back</button>
            <button type="submit">Finish Setup</button>
		</section>
    )
}