import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Legend} from 'react-easy-chart';
import NavBar from './NavBar';
import FilterForm from './FilterForm';
import TransactionForm from './TransactionForm';
import  TransRow  from './TransRow';
import {ResponsivePieChart} from './ResponsivePieChart';
import RequiresLogin from './requiresLogin';
import {fetchProtectedUser} from '../actions/protected-data';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import './Category.css';

const CategoryContainer = styled.section`
    position: relative;
    top: 66px;
    min-height: calc(100vh - 66px);
    background-color: white;
`;

const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #276A73;
    color: white;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    margin-left: 10px;
    font-size: .9em;
    color: #F7B733;
`;

const FilterFormContainer = styled.div`

`;

export class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterMonth: new Date().getMonth(),
            filterYear: new Date().getFullYear()
        }
    }

    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }

    setFilters(month, year) {
        this.setState({
            filterMonth: month,
            filterYear: year
        });
    }

    render() {
        // If user data is not loaded return nothing
        if (this.props.notLoaded) {
            return (null);
        }

        // Set date to filter transacitions from the store
        const filterDate = moment(new Date(this.state.filterYear, this.state.filterMonth));
        let firstDayMonth = filterDate.startOf('month').toISOString();
        let lastDayMonth = filterDate.endOf('month').toISOString();

        const currentMonthTransactions = [];
        
        const transactions = this.props.category.transactions.sort((a, b) => a.date < b.date ? 1 : -1 ).map(transaction => {
            let transactionDate = moment(transaction.date);

            if (transactionDate.isBetween(firstDayMonth, lastDayMonth, null, [])) {
                currentMonthTransactions.push(transaction);
                
                return <TransRow 
                            key={transaction.id} 
                            categoryId={this.props.category.id} 
                            form={`transaction-${transaction.id}-update`}
                            {...transaction}
                        />
            };
        });

        const transactionsTotal = currentMonthTransactions.reduce((accumulator, currentTransaction) => accumulator + parseFloat(currentTransaction.amount), 0);

        return (
            <div>
                <NavBar page={'dashboard'}/>
                <CategoryContainer>
                    <section>
                        <HeaderContainer>
                        <h2>{this.props.category.category}</h2>
                        </HeaderContainer>
                        <FilterFormContainer>
                            <FilterForm 
                                filterMonth={this.state.filterMonth} 
                                filterYear={this.state.filterYear}
                                updateFilters={this.setFilters.bind(this)}
                                categoryId={this.props.category.id}
                            />
                        </FilterFormContainer>
                    </section>
                    <section className="progress-bar">
                        <p>Spent so far: ${parseFloat(transactionsTotal).toFixed(2)} / ${parseFloat(this.props.category.amount).toFixed(2)}</p>
                    </section>
                    <main>
                        <section>
                            <TransactionForm categoryId={this.props.category.id}/>
                        </section>
                        <section>
                            <div>
                                <table className="categories-table">
                                    <thead>
                                        <tr>
                                            <th colSpan="1">Description</th>
                                            <th colSpan="1">Date</th>
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
                </CategoryContainer>
            </div>
        );
    }
};


const mapStateToProps = (state, props) => ({
    notLoaded: state.simplify.user.id === null,
    category: state.simplify.user.categories.find(category => category.id.toString() === props.match.params.categoryId),
    initialValues: state.filterMonth
});


export default RequiresLogin()(connect(mapStateToProps)(Category));