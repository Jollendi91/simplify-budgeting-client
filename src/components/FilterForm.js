import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {fetchTransactions} from '../actions/protected-data';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// To display current filtered month
const currentMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export class FilterForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onDateChange(direction) {
        let nextMonth;
        let nextYear = this.props.filterYear;
        if (direction === "back") {
            nextMonth = this.props.filterMonth - 1;
            if (nextMonth === -1) {
                nextMonth = 11;
                nextYear = this.props.filterYear - 1;
            } 
        } else if (direction === "next") {
            nextMonth = this.props.filterMonth + 1;
            if (nextMonth === 12) {
                nextMonth = 0;
                nextYear = this.props.filterYear + 1;
            }
        }
        this.props.updateFilters(nextMonth, nextYear);
        return this.props.dispatch(fetchTransactions(nextMonth, nextYear, this.props.categoryId));
    }

    render() {
        return (
            <div className="filter-transaction-form">
                <FontAwesomeIcon icon="angle-left" onClick={() => this.onDateChange('back')}/>
                <h3>{currentMonthName[this.props.filterMonth]} {this.props.filterYear}</h3>
                <FontAwesomeIcon icon="angle-right" onClick={() => this.onDateChange('next')}/>
            </div>
        )
    }
}

export default connect()(reduxForm({form: 'filter'})(FilterForm));