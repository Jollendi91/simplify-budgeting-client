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
import {FormContainer, Button} from './styled-components/Forms';

import './AccountSetup.css';

// Styled Components
const SetupStepContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .2);
`;

const SectionContainer = FormContainer.withComponent('article');

const SetupStep = SectionContainer.extend`
    top: 66px;
    min-height: calc(100vh - 66px);
    padding: 0;
    background-color: white;
`;

const Header = styled.h1`
    font-size: 1.5em;
    color: white;
    margin: 0;
    padding: .3em 0;
    background: #20A69A;
`;

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
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
                    <Header>Account Setup - Salary</Header>
                    <MonthlyPaySetup />
                    <p>Step {this.props.step} / 3</p>
                </SetupStep>
            ) 
        } else if (this.props.step === 2) {
            return (
                <SetupStep>
                    <Header>Account Setup - Bills</Header>
                    <MonthlyBillsSetup />
                    <ButtonContainer>
                        <Button onClick={() => this.props.dispatch(updateStep(1))}>Back</Button>
                        <Button onClick={() => this.props.dispatch(updateStep(3))}>Next</Button>
                        <p>Step {this.props.step} / 3</p>
                    </ButtonContainer>
                </SetupStep>
            );
        } else if (this.props.step === 3) {
            return (
                <SetupStep>
                    <Header>Account Setup - Budgets</Header>
                    <CategorySetup />
                    <ButtonContainer>
                        <Button onClick={() => this.props.dispatch(updateStep(2))}>Back</Button>
                        <Link to='/dashboard'>
                            <Button className="finish-button" onClick={() => this.props.dispatch(updateStep(null))}>Finish Setup</Button>
                        </Link>
                        <p>Step {this.props.step} / 3</p>
                    </ButtonContainer>
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