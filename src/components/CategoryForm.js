import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import {addCategory} from '../actions/protected-data';
import {SetupInput, Inputs, Button} from './styled-components/Forms';

export class CategoryForm extends React.Component {
    onSubmit(values) {
        const {category, amount} = values;
        return this.props.dispatch(addCategory(category, amount)).then(() => this.props.reset());
    }

    render() {
        return (
            <form className="add-category-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                <Inputs>
                    <div className="form-input-container">
                        <label htmlFor="category-name">Category</label>
                        <Field 
                            component={SetupInput}
                            type="text"
                            name="category"
                            id="category-name"
                            validate={[required, notEmpty]}
                            ariaLabel="budget name"
                        />
                    </div>
                    <div className="form-input-container">
                    <label htmlFor="category-amount">Amount</label>
                        <Field 
                            component={SetupInput}
                            amount
                            type="number"
                            name="amount"
                            id="category-amount"
                            min="0.01"
                            max={this.props.max}
                            step="0.01"
                            validate={[required, notEmpty]}
                            ariaLabel="budget amount"
                        />
                    </div>
                    <Button 
                        color="#276A73" 
                        disabled={this.props.pristine || this.props.submitting || this.props.max <= 0}
                    >
                        Add
                    </Button>
                </Inputs>    
            </form>
        );
    };
}

export default reduxForm({
    form: 'categories',
    onSubmitFail: (errors, dispatch) => dispatch(focus('categories', Object.keys(errors)[0]))
  })(connect()(CategoryForm));