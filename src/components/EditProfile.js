import React from 'react';
import {connect} from 'react-redux';

import MonthlyPayEdit from './MonthlyPayEdit';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';
import RequiresLogin from './requiresLogin'
import { fetchProtectedUser } from '../actions/protected-data';

import './AccountSetup.css';

export class EditProfile extends React.Component {
    
    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser());
        }
    }

     render()  { 
        return (
            <div>
                <main className="account-setup-container">
                    <h1>Edit your profile</h1>
                    <MonthlyPayEdit />
                    <MonthlyBillsSetup />
                    <CategorySetup />
                </main>
            </div>
         )
    }
};

const mapStateToProps = state => ({
    notLoaded: state.simplify.user.id === null
});

export default RequiresLogin()(connect(mapStateToProps)(EditProfile));