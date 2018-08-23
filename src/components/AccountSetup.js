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
const FormContainer = styled.article`
    width: 100%;
    max-width: 500px;
    padding: 20px 10px;
    margin: auto;
    position: relative;
`;

const SetupStepContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .2);
`;

const SectionContainer = FormContainer.withComponent('article');

const SetupStep = SectionContainer.extend`
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 0;
    transform: translate(-50%, -50%);
    background-color: white;
`;

const Header = styled.h1`
    margin: 0;
    padding: .3em 0;
    color: white;
    background: #20A69A;
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
                <SetupStepContainer>
                    <SetupStep>
                        <Header>Account Setup</Header>
                        <MonthlyPaySetup />
                        <p>Step {this.props.step} / 3</p>
                    </SetupStep>
                </SetupStepContainer>
            ) 
        } else if (this.props.step === 2) {
            return (
                <SetupStep>
                    <h1>Account Setup</h1>
                    <MonthlyBillsSetup />
                    <div className="setup-buttons">
                        <button className="back-button" onClick={() => this.props.dispatch(updateStep(1))}>Back</button>
                        <button className="next-button" onClick={() => this.props.dispatch(updateStep(3))}>Next</button>
                    </div>
                    <p>Step {this.props.step} / 3</p>
                </SetupStep>
            );
        } else if (this.props.step === 3) {
            return (
                <SetupStep>
                    <h1>Account Setup</h1>
                    <CategorySetup />
                    <div className="setup-buttons">
                        <button className="back-button" onClick={() => this.props.dispatch(updateStep(2))}>Back</button>
                        <Link to='/dashboard'>
                            <button className="finish-button" onClick={() => this.props.dispatch(updateStep(null))}>Finish Setup</button>
                        </Link>
                    </div>
                    <p>Step {this.props.step} / 3</p>
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