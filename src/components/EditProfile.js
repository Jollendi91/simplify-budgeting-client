import React from 'react';
import {connect} from 'react-redux';

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
`;

const SectionContainer = styled.section`
    margin: 15px 0 15px;
    padding: 10px 0 30px;
    background-color: white;
`;

export class EditProfile extends React.Component {
    
    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }

     render()  { 
        return (
            <EditContainer>
                <HeaderContainer>
                    <h2>Edit your profile</h2>
                </HeaderContainer>
                <SectionContainer>
                    <MonthlyPayEdit />
                </SectionContainer>
                <SectionContainer>
                    <h2>Bills</h2>
                    <MonthlyBillsSetup />
                </SectionContainer>
                <SectionContainer>
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