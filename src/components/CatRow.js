import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {required, notEmpty} from '../validators';
import { deleteCategory, updateCategory } from '../actions/protected-data';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {UpdateInput} from './styled-components/Forms';
import {StyledTD} from './styled-components/Tables';

// Styled Components
const UpdateCategoryForm = styled.form`
    display: grid;
    grid-template-columns: 30% 30% 20% 20%;
    justify-content: space-between;
    align-items: center;

    .form-input {
        display: inline-block;
        width: 100%;
        padding: 6px 10px;
    }

    .category-amount-input {
        display: flex;
        align-items: center;
    }
`;
UpdateCategoryForm.displayName='UpdateCategoryForm';

const StyledIcon = styled(FontAwesomeIcon)`
   margin: 0 8px;
   color: ${props => props.disabled === true ? "#999" : props.color};
   cursor: pointer;
`;

const IconButton = styled.button`
   border: none;
   padding: 2px;
   background-color: transparent;
`;

const CategoryTD = StyledTD.extend`
    width: 24%;

    .percentage {
        width: 20%:
    }
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
                        <div className='form-input-container percentage'>
                            {Math.round(updateAmount / (this.props.monthlySalary - this.props.billsTotal)* 10000)/100}%
                        </div>
                        <div className="edit-buttons form-input-container">
                            <IconButton className="update-button" type="submit" disabled={this.props.pristine || this.props.submitting}><StyledIcon icon={['far', 'save']} color='#4ABDAC' disabled={this.props.pristine || this.props.submitting}/></IconButton>
                            <IconButton className="cancel-button" onClick={() => this.setEditing()}>
                                <StyledIcon icon='times' color='#FC4A1A' />
                            </IconButton>
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
                    <CategoryTD className="percentage">{Math.round(this.props.amount / (this.props.monthlySalary - this.props.billsTotal)* 10000)/100}%</CategoryTD>
                    <CategoryTD className="edit-buttons">
                        <IconButton className="edit-button" onClick={() => this.setEditing()}>
                            <StyledIcon icon={['far', 'edit']} color='#4ABDAC' />
                        </IconButton>
                        <IconButton className="delete-button" onClick={() => this.props.dispatch(deleteCategory(this.props.id))}>
                            <StyledIcon icon={['far', 'trash-alt']} color='#FC4A1A' />
                        </IconButton>
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