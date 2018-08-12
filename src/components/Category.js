import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {PieChart} from 'react-easy-chart';
import NavBar from './NavBar';
import FilterForm from './FilterForm';
import TransactionForm from './TransactionForm';
import  TransRow  from './TransRow';
import RequiresLogin from './requiresLogin';

import { addTransaction} from '../actions/protected-data';

import './Category.css';

export class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterMonth: new Date().getMonth(),
            fitlerYear: new Date().getFullYear()
        }
    }

    setFilters(month, year) {
        this.setState({
            filterMonth: month,
            filterYear: year
        });
    }

    render() {

        if (this.props.category === null) {
           return <Redirect to="/account-setup"/>
        }
        

        // Set date to filter transacitions from the store
        const filterDate = moment(new Date(this.state.fitlerYear, this.state.filterMonth));
        let firstDayMonth = filterDate.startOf('month').toISOString();
        let lastDayMonth = filterDate.endOf('month').toISOString();

        const currentMonthTransactions = [];
        
        const transactions = this.props.category.transactions.map(transaction => {
            let transactionDate = moment(transaction.date);

            if (transactionDate.isBetween(firstDayMonth, lastDayMonth, null, [])) {
                currentMonthTransactions.push(transaction);
                
                return <TransRow key={transaction.id} categoryId={this.props.category.id} {...transaction} form={`transaction-${transaction.id}-update`}/>
            }
        });

        const transactionsTotal = currentMonthTransactions.reduce((accumulator, currentTransaction) => accumulator + parseFloat(currentTransaction.amount), 0);

        // To display current filtered month
        const currentMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Data to push to the Pie Chart
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
                                <h3>{currentMonthName[this.state.filterMonth]}</h3>
                                <FilterForm 
                                    filterMonth={this.state.filterMonth} 
                                    filterYear={this.state.fitlerYear}
                                    updateFilters={this.setFilters.bind(this)}
                                    categoryId={this.props.category.id}
                                />
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
    // Only set categroy if categories exist
    let category = null;
    if (state.simplify.user.categories) {
        category = state.simplify.user.categories.find(category => category.id.toString() === props.match.params.categoryId)
    }
    return {
    reloaded: state.simplify.user === '',
    category: category,
    initialValues: state.filterMonth
}};


export default RequiresLogin()(connect(mapStateToProps)(Category));