import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { updateStep, fetchProtectedUser} from '../actions/protected-data';

import RequiresLogin from './requiresLogin';
import MonthlyPaySetup from './MonthlyPaySetup';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';

import styled from 'styled-components';
import './AccountSetup.css';

// Styled Components
const SetupStep = styled.section`
    max-width: 500px;
    width: 100%;
    height: 50vh;
    position: absolute;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: grey;
`;

export class AccountSetup extends React.Component {

    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }
   
    render() {
        
        if (this.props.step === null) {

            return <Redirect to="/dashboard"/>
    
        } else if (this.props.step === 1) {
            return (
                <SetupStep>
                    <p>Step {this.props.step} / 3</p>
                    <h1>Let's get setup!</h1>
                    <MonthlyPaySetup />
                </SetupStep>
            ) 
        } else if (this.props.step === 2) {
            return (
                <SetupStep>
                    <p>Step {this.props.step} / 3</p>
                    <MonthlyBillsSetup />
                    <div className="setup-buttons">
                        <button className="back-button" onClick={() => this.props.dispatch(updateStep(1))}>Back</button>
                        <button className="next-button" onClick={() => this.props.dispatch(updateStep(3))}>Next</button>
                    </div>
                </SetupStep>
            );
        } else if (this.props.step === 3) {
            return (
                <SetupStep>
                    <p>Step {this.props.step} / 3</p>
                    <CategorySetup />
                    <div className="setup-buttons">
                        <button className="back-button" onClick={() => this.props.dispatch(updateStep(2))}>Back</button>
                        <Link to='/dashboard'>
                            <button className="finish-button" onClick={() => this.props.dispatch(updateStep(null))}>Finish Setup</button>
                        </Link>
                    </div>
                </SetupStep>
            );
        }
        return null;
    }
};

const MapStateToProps = state => ({
    step: state.simplify.user.setupStep,
    notLoaded: state.simplify.user.id === null
});


export default RequiresLogin()(connect(MapStateToProps)(AccountSetup));