import React from 'react';
import {connect} from 'react-redux';
import MainLoadingSpinner from './MainLoadingSpinner';
import MonthlyPayEdit from './MonthlyPayEdit';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';
import RequiresLogin from './requiresLogin'
import { fetchProtectedUser } from '../actions/protected-data';

import styled from 'styled-components';
import {ComponentContainer, HeaderContainer} from './styled-components/Elements';


// Styled Components
const EditContainer = ComponentContainer.extend`
    background-color: transparent;

    @media screen and (min-width: 800px) {
        max-width: 1000px;
        margin: auto;
        display: grid;
        grid-template-rows: 55px 1fr 3fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 15px;
        align-items: start;
        justify-content: start;
        padding: 10px 15px;

        header {
            grid-row: 1;
            grid-column: 1 / 5;
        }
        
        .monthly-pay-edit {
            grid-row: 2;
            grid-column: 1 / 5;
        }

        .bills-edit {
            grid-row: 3;
            grid-column: 1 / 3;
        }

        .budgets-edit {
            grid-row: 3;
            grid-column: 3 / 5;
        }
    }
`;

const SectionContainer = styled.section`
    margin: 15px 0 15px;
    padding: 10px 0 30px;
    background-color: white;

    @media screen and (min-width: 800px) {
        margin: 0;
        border-radius: 5px;
    }
`;

export class EditProfile extends React.Component {
    
    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }

     render()  { 
        if (this.props.notLoaded) {
            return (
                <MainLoadingSpinner />
            )
        }
        return (
            <EditContainer>
                <HeaderContainer>
                    <h2>Edit Profile</h2>
                </HeaderContainer>
                <SectionContainer className="monthly-pay-edit">
                    <MonthlyPayEdit />
                </SectionContainer>
                <SectionContainer className="bills-edit">
                    <h2>Bills</h2>
                    <MonthlyBillsSetup />
                </SectionContainer>
                <SectionContainer className="budgets-edit">
                    <h2>Budgets</h2>
                    <CategorySetup />
                </SectionContainer>
            </EditContainer>
         )
    }
};

const mapStateToProps = state => ({
    notLoaded: state.simplify.user.id === null
});

export default RequiresLogin()(connect(mapStateToProps)(EditProfile));