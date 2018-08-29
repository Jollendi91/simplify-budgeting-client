import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import Input from './input';
import { deleteCategory, updateCategory } from '../actions/protected-data';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {UpdateInput} from './styled-components/Forms';
import {StyledTD} from './styled-components/Tables';

// Styled Components
const UpdateCategoryForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .form-input-container {
        width: 24%;
        padding: 8px;
    }

    .form-input {
        display: inline-block;
        width: 100%;
    }

    .category-amount-input {
        display: flex;
        align-items: center;
    }
`;
UpdateCategoryForm.displayName='UpdateCategoryForm';

const StyledIcon = styled(FontAwesomeIcon)`
   margin: 0 8px;
   color: ${props => props.color ? props.color : 'black'};
   cursor: pointer;
`;

const SubmitButton = styled.button`
   border: none;
   padding: 2px;
   background-color: transparent;
`;

const CategoryTD = StyledTD.extend`
    width: 24%;
`;

const FormTD = StyledTD.extend`
    padding: 0;
    width: 24%;
`;

// CatRow Component
export class CatRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    onSubmit(values) {
        const {category, amount} = values;
        this.props.dispatch(updateCategory(this.props.id, category, amount)).then(() => this.setEditing());
    }
    
    render() {
        let updateAmount;
        if (this.props.currentForm !== undefined) {
            if (this.props.currentForm.values) {
                updateAmount = this.props.currentForm.values.amount;
            }
        };
           
         if (this.state.editing) {
          return  (
            <tr>
                <FormTD colSpan="4">
                    <UpdateCategoryForm onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                        <div className="form-input-container">
                            <Field
                                component={UpdateInput}
                                type="text"
                                name="category"
                                id="category-update"
                                validate={[required, notEmpty]}
                            />
                        </div>
                        <div className="form-input-container category-amount-input">
                            $<Field 
                                component={UpdateInput}
                                type="number"
                                name="amount"
                                id="category-amount-update"
                                step="0.01"
                                min="0.01"
                                max={parseFloat(this.props.amount) + this.props.max}
                                validate={[required, notEmpty]}
                            />
                        </div>
                        <div className='form-input-container'>
                            {Math.round(updateAmount / (this.props.monthlySalary - this.props.billsTotal)* 10000)/100}%
                        </div>
                        <div className="edit-buttons form-input-container">
                            <SubmitButton className="update-button" type="submit" disabled={this.props.pristine || this.props.submitting}><StyledIcon icon={['far', 'save']} color='#4ABDAC' /></SubmitButton>
                            <StyledIcon className='cancel-button' icon='times' color='#FC4A1A' onClick={() => this.setEditing()}/>
                        </div>
                    </UpdateCategoryForm>
                </FormTD> 
            </tr>
            )
        } else {

            return (
                <tr key={this.props.index}>
                    <CategoryTD>{this.props.category}</CategoryTD>
                    <CategoryTD>${parseFloat(this.props.amount).toFixed(2)}</CategoryTD>
                    <CategoryTD>{Math.round(this.props.amount / (this.props.monthlySalary - this.props.billsTotal)* 10000)/100}%</CategoryTD>
                    <CategoryTD className="edit-buttons">
                        <StyledIcon className='edit-button' icon={['far', 'edit']} color='#4ABDAC' onClick={() => this.setEditing()}/>
                        <StyledIcon className='delete-button' icon={['far', 'trash-alt']} color='#FC4A1A'  onClick={() => this.props.dispatch(deleteCategory(this.props.id))}/>
                    </CategoryTD>
                </tr>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    monthlySalary: state.simplify.user.monthlySalary,
    billsTotal: state.simplify.user.bills.reduce((accumulator, currentBill) => accumulator + parseFloat(currentBill.amount), 0),
    initialValues: props,
    currentForm: state.form[props.form]
});

export default connect(mapStateToProps)(reduxForm({
    onSubmitFail: (errors, dispatch, submitError, props) => dispatch(focus(props.form, Object.keys(errors)[0]))
  })(CatRow));