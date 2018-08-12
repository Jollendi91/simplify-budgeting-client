import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {PieChart} from 'react-easy-chart';
import NavBar from './NavBar';
import TransactionForm from './TransactionForm';
import  TransRow  from './TransRow';
import RequiresLogin from './requiresLogin';

import { addTransaction} from '../actions/protected-data';

import './Category.css';

export class Category extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        if (this.props.category === null) {
           return <Redirect to="/account-setup"/>
        }

        const transactions = this.props.category.transactions.map(transaction =>
        <TransRow key={transaction.id} categoryId={this.props.category.id} {...transaction} form={`transaction-${transaction.id}-update`}/>
        );

        const transactionsTotal = this.props.category.transactions.reduce((accumulator, currentTransaction) => accumulator + parseFloat(currentTransaction.amount), 0);

        let data = [];

        if (transactionsTotal) {
            data.push({
                key: 'Spent',
                value: transactionsTotal
            });
        };

        if (parseFloat(this.props.category.amount) - transactionsTotal > 0) {
            data.push({
                key: 'Remaining',
                value: this.props.category.amount - transactionsTotal
            });
        }

        return (
            <div>
                <NavBar page={'dashboard'}/>
                <div className="category-container">
                    <header>
                        <section>
                            <h1>{this.props.category.category}</h1>
                            <div className="category-header">
                                <h2>${parseFloat(this.props.category.amount).toFixed(2)}/Month</h2>
                            </div>
                            <div className="filter-transactions">
                                <h3>July</h3>
                                <select name="transaction-data-month" defaultValue="july">
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                </select>
                                <select name="transaction-data-year" defaultValue="2018">
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                </select>
                            </div>
                        </section>
                        <section className="progress-bar">
                            <PieChart 
                                labels
                                size={350}
                                innerHoleSize={200}
                                data={data}/>
                            <p>Spent so far: ${parseFloat(transactionsTotal).toFixed(2)} / ${parseFloat(this.props.category.amount).toFixed(2)}</p>
                        </section>
                    </header>
                    <main>
                        <section>
                            <TransactionForm categoryId={this.props.category.id}/>
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
    }
};


const mapStateToProps = (state, props) => {
    let category = null;
    if (state.simplify.user.categories) {
        category = state.simplify.user.categories.find(category => category.id.toString() === props.match.params.categoryId)
    }
    return {
    reloaded: state.simplify.user === '',
    category: category
}};


export default RequiresLogin()(connect(mapStateToProps)(Category));