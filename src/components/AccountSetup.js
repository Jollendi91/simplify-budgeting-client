import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { setupStep, fetchProtectedUser } from '../actions/protected-data';

import RequiresLogin from './requiresLogin';
import MonthlyPaySetup from './MonthlyPaySetup';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';

import './AccountSetup.css';

export class AccountSetup extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedUser());
    }

   setStep(step) {
        this.props.dispatch(setupStep(step));
    }

    render() {
        
        if (this.props.step === null) {

            return <Redirect to="/dashboard"/>
    
        } else if (this.props.step === 1) {
            return (
                <section className="setup-step">
                    <h1>Let's get setup!</h1>
                    <p>Step {this.props.step} / 3</p>
                    <MonthlyPaySetup />
                </section>
            ) 
        } else if (this.props.step === 2) {
            return (<section className="setup-step">
                <p>Step {this.props.step} / 3</p>
                <MonthlyBillsSetup />
                <div className="setup-buttons">
                    <button onClick={() => this.setStep(1)}>Back</button>
                    <button onClick={() => this.setStep(3)}>Next</button>
                </div>
            </section>)
        } else if (this.props.step === 3) {
            return (<section className="setup-step">
                <p>Step {this.props.step} / 3</p>
                <CategorySetup />
                <div className="setup-buttons">
                    <button onClick={() => this.setStep(2)}>Back</button>
                    <Link to='/dashboard'>
                        <button onClick={() => this.setStep(null)}>Finish Setup</button>
                    </Link>
                </div>
            </section>)
        }
        return null;
    }
};

const MapStateToProps = state => ({
    step: state.simplify.user.setupStep
});


export default RequiresLogin()(connect(MapStateToProps)(AccountSetup));