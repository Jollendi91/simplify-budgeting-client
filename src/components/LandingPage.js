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

const StepsContainer = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    max-width: 1200px;
    margin: auto;

    @media screen and (min-width: 800px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }
`;

const StepsList = styled.ol`
    counter-reset: counter;
    list-style: none;
    padding: 0;

    li {
        counter-increment: counter;
        position: relative;
    }

    section:nth-child(1) {
        color: rgba(39,106,115,0.3);
    }

    section:nth-child(2) {
        color: rgba(252, 74, 26, 0.3);
    }

    section:nth-child(3) {
        
        color: rgba(247, 183, 51, 0.3);
    }

    li::before {
        content: counter(counter);
        font-size: 12em;
        font-weight: bold;
        position: absolute;
        left: 13%;
        top: -93px;
        text-align: center;
        z-index: 0;
    }

    h3, p {
        position: relative;
        color: black;
    }
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
                    <p>Spent too much on groceries? Like to cut back on eating out? Simplify can help. Setup flexible budgets so you know exactly how much you are spending in each category each month</p>
                </LandingSection>
                <LandingSection>
                    <header>
                        <StyledIcon color="#FC4A1A" icon="calculator"/>
                        <h2>Flexible for You</h2>
                    </header>
                    <p>Simplify was inspired by a Zero-Based Budgeting system. While this form of budgeting is extremely helpful, it may not be for everyone. Simplify is flexible enough to be used how you see fit</p>
                </LandingSection>
            </MainSection>
            <section>
                <h2>As Simple as <span>1</span><span>2</span><span>3</span>...</h2>
                <StepsList>
                    <LandingSection>
                        <li>
                            <h3>Take Home Pay</h3>
                            <p>Enter the amount of money you take home after taxes each month. This gives us our starting point</p>
                        </li>
                    </LandingSection>
                    <LandingSection>
                        <li>
                            <h3>Monthly Bills</h3>
                            <p>Add all your monthly bills and expenses. This gives you an overview of how much money you have going out and helps us figure out how much you have left to work with</p>
                        </li>
                    </LandingSection>
                    <LandingSection>
                        <li>
                            <h3>Create Budgets</h3>
                            <p>Creat budgets to track your money in areas of your choosing. This can be as vague or as specific as you like. When a money is transfered or a purchase is made, enter the transaction into your budget</p>
                        </li>
                    </LandingSection>
                </StepsList>
            </section>
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