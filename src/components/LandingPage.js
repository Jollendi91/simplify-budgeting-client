import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// Styled Components
const LandingPageContainer = styled.main`
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
    position: relative;
    top: 60px;
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
    max-width: 400px;
    padding: 40px 20px;  
    margin: auto;

    @media screen and (min-width: 800px) {
        margin: 0 15px;
    }
`;

const StepSection = LandingSection.withComponent('li');

const StepsContainer = styled.section`
    background: linear-gradient(to top, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 90%,rgba(255,255,255,1) 100%), linear-gradient(to top, rgba(0,0,0,0.85) 0%,rgba(0,0,0,.25) 100%), url(https://source.unsplash.com/yw7mV9JeND4);
    background-size: cover;
    background-position: center center;
`;

const StepsList = styled.ol`
    display: grid;
    grid-template-columns: 1fr;
    max-width: 1200px;
    margin: auto;
    padding: 0;
    counter-reset: counter;
    list-style: none;

    li {
        counter-increment: counter;
        position: relative;
    }

    li:nth-child(1) {
        color: rgba(39,106,115,0.5);
    }

    li:nth-child(2) {
        color: rgba(252, 74, 26, 0.5);
    }

    li:nth-child(3) {
        
        color: rgba(247, 183, 51, 0.5);
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

    h2, p {
        position: relative;
        color: #DEDCE3;
    }

    @media screen and (min-width: 800px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(7, 75px);

        h1 {
            grid-column: 1 / 4;
        }
        .step-1 {
            grid-column: 1;
            grid-row: 2 / 5;
        }

        .step-2 {
            grid-column: 2;
            grid-row: 3 / 6;
        }

        .step-3 {
            grid-column: 3;
            grid-row: 4 / 7
        }

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
            <StepsContainer>
                <h1>As Simple as 123...</h1>
                <StepsList>
                    <StepSection className="step-1">
                        <div>
                            <h2>Take Home Pay</h2>
                            <p>Enter the amount of money you take home after taxes each month. This gives us our starting point</p>
                        </div>
                    </StepSection>
                    <StepSection className="step-2">
                        <div>
                            <h2>Monthly Bills</h2>
                            <p>Add all your monthly bills and expenses. This gives you an overview of how much money you have going out and helps us figure out how much you have left to work with</p>
                        </div>
                    </StepSection>
                    <StepSection className="step-3">
                        <div>
                            <h2>Create Budgets</h2>
                            <p>Creat budgets to track your money in areas of your choosing. This can be as vague or as specific as you divke. When a money is transfered or a purchase is made, enter the transaction into your budget</p>
                        </div>
                    </StepSection>
                </StepsList>
            </StepsContainer>
            <footer>
                <p>2018 &copy; Created by Joshua Ollendick</p>
            </footer>
        </LandingPageContainer>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);