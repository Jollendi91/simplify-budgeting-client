import React from 'react';
import {connect} from 'react-redux';

import './MonthlyPayEdit.css';

export class MonthlyPayEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            editing: false
        }
    }

    setEditing() {
        this.setState({
            editing: !this.state.editing
        });
    }

    render() {
        let salaryForm;

        if (!this.state.editing) {
            salaryForm = <div>
                            <button onClick={() => this.setEditing()}>Edit Salary</button>
                        </div>
        } else {
            salaryForm = 
            <form>
                <input className="salaryInput" type="number" min="0" step="0.01" />
                <div>
                    <button type="submit">Update</button>
                    <button onClick={() => this.setEditing()}>Cancel</button>
                </div>
            </form>
        }

        return (
            <section className="monthly-pay-container">
                <h2>Monthly Salary</h2>
                <section className="salary-container">
                    <div>
                       <p>Current monthly salary:  
                           <span> ${this.props.monthlySalary}</span></p>
                    </div>
                    {salaryForm}
                </section>
            </section>
        )
    }
};

const mapStateToProps = state => ({
    monthlySalary: state.monthlySalary
})

export default connect(mapStateToProps)(MonthlyPayEdit); 