import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';

import './Category.css';


export function Category(props) {

    const transactions = props.transactions.map(transaction =>
        <tr>
            <td>{transaction.name}</td>
            <td>{transaction.date}</td>
            <td>${transaction.amount}</td>
            <td>X</td>
        </tr>
    );

    const transactionsTotal = props.transactions.reduce((accumulator, currentTransaction) => accumulator + currentTransaction.amount, 0);

    console.log(props.category);
    return (
        <div>
            <NavBar page={'dashboard'}/>
            <div className="category-container">
                <header>
                    <h1>{props.category.name}</h1>
                    <div className="category-header">
                        <h2>${props.category.amount}/Month</h2>
                        <div>
                            <h1>July</h1>
                            <select name="transaction-data-month" defaultValue="july">
                                <option value="january">January</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                <option value="april">April</option>
                                <option value="may">May</option>
                                <option value="june">June</option>
                                <option value="july">July</option>
                                <option value="august">August</option>
                                <option value="september">September</option>
                                <option value="october">October</option>
                                <option value="november">November</option>
                                <option value="december">December</option>
                            </select>
                            <select name="transaction-data-year">
                                <option>2017</option>
                                <option selected>2018</option>
                            </select>
                        </div>
                    </div>
                </header>
                <main>
                    <section className="progress-bar">
                        <p>Spent so far: ${transactionsTotal} / ${props.category.amount}</p>
                        <p>[Progress Bar]</p>
                    </section>
                    <section>
                        <form>
                            <div>
                                <label htmlFor="transaction-description">Description</label>
                                <input type="type" name="transaction-description" id="transaction-description" />
                            </div>
                            <div>
                                <label htmlFor="transaction-date">Transaction Date</label>
                                <input type="date" name="transaction-date" id="transaction-date" />
                            </div>
                            <div>
                                <label htmlFor="account-amount">Amount</label>
                                <input type="number" step="0.01" min="0" name="account-amount" id="account-amount" />
                            </div>
                            <button type="submit">Add Transaction</button>
                        </form>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th colSpan="2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {transactions}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    category: state.categories.find(category => category.id.toString() === props.match.params.categoryId),
    transactions: state.transactions.filter(transaction => transaction.category_id.toString() === props.match.params.categoryId)
})


export default connect(mapStateToProps)(Category);