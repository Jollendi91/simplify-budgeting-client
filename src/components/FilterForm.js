import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {fetchTransactions} from '../actions/protected-data';



export class FilterForm extends React.Component {
    onSubmit(values) {
        const {filterMonth, filterYear} = values;
        this.props.updateFilters(filterMonth, filterYear);
      
       return this.props.dispatch(fetchTransactions(parseInt(filterMonth), parseInt(filterYear), this.props.categoryId));

    }

    render() {
        return (
            <form className="filter-transaction-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                <Field 
                    component="select"
                    name="filterMonth"
                    id="filter-month">
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
                </Field>
                <Field
                    component="select"
                    name="filterYear"
                    id="filter-year">
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                </Field>
                <button>Filter</button>
            </form>
        )
    }
}

const mapStateToProps = (state, props) => ({
    initialValues: props
});

export default connect(mapStateToProps)(reduxForm({form: 'filter'})(FilterForm));