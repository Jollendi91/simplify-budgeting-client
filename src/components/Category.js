import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import NavBar from './NavBar';
import FilterForm from './FilterForm';
import TransactionForm from './TransactionForm';
import  TransRow  from './TransRow';
import ProgressBar from 'react-progress-bar.js';
import RequiresLogin from './requiresLogin';
import {fetchProtectedUser} from '../actions/protected-data';

import styled from 'styled-components';
import {StyledTable, StyledTH, StyledTBody} from './styled-components/Tables';
import {HeaderContainer, ComponentContainer} from './styled-components/Elements';
import './Category.css';

// Styled Components
const ProgressContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    p {
        padding: 0 15px;
    }
`;

const AddFormContainer = styled.section`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
`;

// Progress Bar
const RemainingBar = ProgressBar.Line;

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
	}
};

const containerStyle = {
    height: '5px'
};

// Category Component
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
                <ComponentContainer>
                    <section>
                        <HeaderContainer>
                        <h2>{this.props.category.category}</h2>
                        </HeaderContainer>
                        <FilterForm 
                            filterMonth={this.state.filterMonth} 
                            filterYear={this.state.filterYear}
                            updateFilters={this.setFilters.bind(this)}
                            categoryId={this.props.category.id}
                        />
                    </section>
                    <ProgressContainer>
                        <p>${parseFloat(transactionsTotal).toFixed(2)}</p>
                        <RemainingBar 
                            progress={parseFloat(transactionsTotal)/ this.props.category.amount }
                            options={options}
                            containerStyle={containerStyle}
                            intialAnimate={true}
                        />
                        <p>${parseFloat(this.props.category.amount).toFixed(2)}</p>
                    </ProgressContainer>
                    <main>
                        <AddFormContainer>
                            <TransactionForm categoryId={this.props.category.id}/>
                        </AddFormContainer>
                        <section>
                            <div>
                                <StyledTable>
                                    <thead>
                                        <tr>
                                            <StyledTH colSpan="1">Description</StyledTH>
                                            <StyledTH colSpan="1">Date</StyledTH>
                                            <StyledTH colSpan="2">Amount</StyledTH>
                                        </tr>
                                    </thead>
                                    <StyledTBody>
                                    {transactions}
                                    </StyledTBody>
                                </StyledTable>
                            </div>
                        </section>
                    </main>
                </ComponentContainer>
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