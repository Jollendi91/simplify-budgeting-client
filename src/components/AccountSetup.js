import React from 'react';
import {Link} from 'react-router-dom';

import './AccountSetup.css';

import MonthlyPaySetup from './MonthlyPaySetup';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';
import {connect} from 'react-redux';
import { setupStep } from '../actions';

export function AccountSetup(props) {

    function setStep(step) {
        props.dispatch(setupStep(step));
    }

    if (props.step === 1) {
        return (
            <section className="setup-step">
                <h1>Let's get setup!</h1>
                <p>Step {props.step} / 3</p>
                <MonthlyPaySetup />
            </section>
        ) 
    } else if (props.step === 2) {
        return (<section className="setup-step">
            <p>Step {props.step} / 3</p>
            <MonthlyBillsSetup />
            <div className="setup-buttons">
                <button onClick={() => setStep(1)}>Back</button>
                <button onClick={() => setStep(3)}>Next</button>
            </div>
        </section>)
    } else if (props.step === 3) {
        return (<section className="setup-step">
            <p>Step {props.step} / 3</p>
            <CategorySetup />
            <div className="setup-buttons">
                <button onClick={() => setStep(2)}>Back</button>
                <Link to='/dashboard'>
                    <button onClick={() => setStep(null)}>Finish Setup</button>
                </Link>
            </div>
        </section>)
    }
};

const MapStateToProps = state => ({
    step: state.setupStep
});


export default connect(MapStateToProps)(AccountSetup);