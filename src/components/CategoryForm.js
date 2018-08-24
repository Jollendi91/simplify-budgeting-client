import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, notEmpty} from '../validators';
import {addCategory} from '../actions/protected-data';

import styled from 'styled-components';
import {StyledInput, Button} from './styled-components/Forms';

// Styled Components
const SetupInput = StyledInput.extend`
    max-width: 150px;
`;

const Inputs = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

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
                        />
                    </div>
                    <div className="form-input-container">
                    <label htmlFor="category-amount">Amount</label>
                        <Field 
                            component={SetupInput}
                            type="number"
                            name="amount"
                            id="category-amount"
                            min="0.01"
                            max={this.props.max}
                            step="0.01"
                            validate={[required, notEmpty]}
                        />
                    </div>
                </Inputs>
                <Button disabled={this.props.pristine || this.props.submitting || this.props.max <= 0}>Add Category</Button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'categories',
    onSubmitFail: (errors, dispatch) => dispatch(focus('categories', Object.keys(errors)[0]))
  })(connect()(CategoryForm));