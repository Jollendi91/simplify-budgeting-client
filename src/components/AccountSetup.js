import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { updateStep, fetchProtectedUser} from '../actions/protected-data';
import MainLoadingSpinner from './MainLoadingSpinner';
import RequiresLogin from './requiresLogin';
import MonthlyPaySetup from './MonthlyPaySetup';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';
import styled from 'styled-components';
import {FormContainer, Button} from './styled-components/Forms';

// Styled Components
const SetupStep = FormContainer.withComponent('article').extend`
    display: flex;
    flex-direction: column;
    top: 66px;
    min-height: calc(100vh - 66px);
    padding: 0;
    background-color: white;

    @media screen and (min-width: 800px) {
        min-height: 600px;
        margin: 15px auto;
    }
`;

const PayStep = SetupStep.extend`
    justify-content: space-between;
`;

const Header = styled.h1`
    font-size: 1.5em;
    color: white;
    margin: 0;
    padding: .3em 0;
    background: #276A73;
`;

const ButtonContainer = styled.div`
    width: 100%;
`;

// Account Setup Component
export class AccountSetup extends React.Component {

    // Load user data if it does not exist
    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }
   
    render() {
        //Show spinner if loading data
        if (this.props.loading) {
            return (
                <MainLoadingSpinner />
            );
        } else if (this.props.step === null) {

            // If setup has been completed redirect to dashboard
            return <Redirect to="/dashboard"/>
    
        } else if (this.props.step === 1) {
            return (
                <PayStep>
                    <Header>Account Setup - Salary</Header>
                    <MonthlyPaySetup />
                    <p>Step {this.props.step} / 3</p>
                </PayStep>
            );
        } else if (this.props.step === 2) {
            return (
                <SetupStep>
                    <Header>Account Setup - Bills</Header>
                    <MonthlyBillsSetup />
                    <ButtonContainer>
                        <Button 
                            primary 
                            color="#276A73" 
                            className='back-button' 
                            onClick={() => this.props.dispatch(updateStep(1))}
                        >
                            Back
                        </Button>
                        <Button 
                            color="#276A73" 
                            className='next-button' 
                            onClick={() => this.props.dispatch(updateStep(3))}
                        >
                            Next
                        </Button>
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
                        <Button 
                            primary 
                            color="#276A73" 
                            className='back-button' 
                            onClick={() => this.props.dispatch(updateStep(2))}
                        >
                            Back
                        </Button>
                        <Link to='/dashboard'>
                            <Button 
                                color="#276A73" 
                                className="finish-button" 
                                onClick={() => this.props.dispatch(updateStep(null))}
                            >
                                Finish Setup
                            </Button>
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
    loading: state.simplify.loading,
    step: state.simplify.user.setupStep,
    notLoaded: state.simplify.user.id === null
});

export default RequiresLogin()(connect(MapStateToProps)(AccountSetup));