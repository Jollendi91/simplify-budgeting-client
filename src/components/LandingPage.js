import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import SignupForm from './SignupForm';

import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './LandingPage.css';

// Styled Components

const LandingPageContainer = styled.div`
    background-color: white;
    position: relative;
    top: 66px;
`;

const HeroContainer = styled.header`
    padding: 40px 15px;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 90%,rgba(255,255,255,1) 100%), linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%),  url(https://source.unsplash.com/pElSkGRA2NU);
    background-size: cover;
    height: calc(100vh - 66px);
    background-position: center 75%;
    background-repeat: no-repeat;
    position: relative;

    @media screen and (min-width: 545px) {
        padding: 15px;
    }
`;

const Header = styled.h2`
    color: white;
    text-align: left;
    font-size: 4.5em;
    text-transform: uppercase;
    display: flex;
    align-items: flex-end;
    @media screen and (min-width: 545px) {
        font-size: 5.5em;
        margin-left: 14%;
    }
`;

const LearnMore = styled.div`
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    font-size: 1.5em;

    p {
        margin: 5px;
    }
`;

const MainSection = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    max-width: 1200px;
    margin: auto;

    @media screen and (min-width: 800px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const LandingSection = styled.section`
    min-height: 200px;
    padding: 40px 20px;  
    margin: 0 15px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: ${props => props.fontSize ? props.fontSize : '2.25em'};
    color: ${props => props.color ? props.color : 'black'};
`;

export function LandingPage(props) {

    if (props.loggedIn) {
        return <Redirect to="/account-setup" />;
    }

    return (
        <LandingPageContainer>
            <HeroContainer>
                <div>
                    <Header><span><StyledIcon fontSize="1.8em" color="#4ABDAC" icon="dollar-sign"/></span>implify</Header>
                    <Header>your</Header>
                    <Header>Finances</Header>
                </div>
                <LearnMore>
                    <p>Learn more</p>
                    <FontAwesomeIcon icon="chevron-down"/>
                </LearnMore>
            </HeroContainer>
             <MainSection>
                <LandingSection>
                    <header>
                        <StyledIcon color="#276A73" icon="money-bill-wave" />
                        <h2>Budgeting Simplified</h2>
                    </header>
                    <p>Simplify focuses on one fundamental idea, to know how much money you have, and where it is going. Knowing is the first step in taking control of your finances</p>
                </LandingSection>
                <LandingSection>
                    <header>
                        <StyledIcon color="#F7B733" icon="chart-line" />
                        <h2>Track your Progress</h2>
                    </header>
                    <p>Spent too much on groceries? Like to cut back on eating out? Simplify can help. Setup flexbile budgets so you know exactly how much you are spending in each category</p>
                </LandingSection>
                <LandingSection>
                    <header>
                        <StyledIcon color="#FC4A1A" icon="calculator"/>
                        <h2>Flexible for You</h2>
                    </header>
                    <p>Simplify was inspired by a Zero-Based Budgeting system. While this form of budgeting is extremely helpful, it may not be for everyone. Simplify is flexible enough to be used how you see fit</p>
                </LandingSection>
            </MainSection>
            <footer>
                Created by Josh
            </footer>
        </LandingPageContainer>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);