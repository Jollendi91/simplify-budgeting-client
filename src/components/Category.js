import React from 'react';
import {connect} from 'react-redux';

import {PieChart} from 'react-easy-chart';
import NavBar from './NavBar';

import './Category.css';
import { addTransaction } from '../actions';
import  TransRow  from './TransRow';


export function Category(props) {

    const transactions = props.category.transactions.map((transaction, index) =>
        <TransRow key={index} categoryId={props.category.id} {...transaction} />
    );

    const transactionsTotal = props.category.transactions.reduce((accumulator, currentTransaction) => accumulator + currentTransaction.amount, 0);
    
    let transactionName;
    let transactionDate;
    let transactionAmount;

    function onSubmit(event) {
        event.preventDefault();
        props.dispatch(addTransaction(transactionName.value, transactionDate.value, parseFloat(transactionAmount.value), props.category.id));

        transactionName.value = '';
        transactionDate.value = '';
        transactionAmount.value = '';
    };

    let data = [];

    if (transactionsTotal) {
        data.push({
            key: 'Spent',
            value: transactionsTotal
        });
    };

    if (props.category.amount - transactionsTotal > 0) {
        data.push({
            key: 'Remaining',
            value: props.category.amount - transactionsTotal
        });
    }

    return (
        <div>
            <NavBar page={'dashboard'}/>
            <div className="category-container">
                <header>
                    <section>
                        <h1>{props.category.category}</h1>
                        <div className="category-header">
                            <h2>${props.category.amount.toFixed(2)}/Month</h2>
                        </div>
                        <div className="filter-transactions">
                            <h3>July</h3>
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
                    </section>
                    <section className="progress-bar">
                        <PieChart 
                            labels
                            size={350}
                            innerHoleSize={200}
                            data={data}/>
                        <p>Spent so far: ${transactionsTotal.toFixed(2)} / ${props.category.amount.toFixed(2)}</p>
                    </section>
                </header>
                <main>
                    <section>
                        <form className="add-transaction-form" onSubmit={(event) => onSubmit(event)}>
                            <div>
                                <label htmlFor="transaction-description">Description</label>
                                <input type="type" name="transaction-description" id="transaction-description" ref={input => transactionName = input} required="true"/>
                            </div>
                            <div>
                                <label htmlFor="transaction-date">Transaction Date</label>
                                <input type="date" name="transaction-date" id="transaction-date" ref={input => transactionDate = input} required="true"/>
                            </div>
                            <div>
                                <label htmlFor="account-amount">Amount</label>
                                <input type="number" step="0.01" min="0" name="account-amount" id="account-amount" ref={input => transactionAmount = input} required="true"/>
                            </div>
                            <button type="submit">Add Transaction</button>
                        </form>
                    </section>
                    <section>
                        <div>
                            <table className="categories-table">
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
    category: state.simplify.user.categories.find(category => category.id.toString() === props.match.params.categoryId)
});


export default connect(mapStateToProps)(Category);