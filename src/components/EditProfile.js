import React from 'react';
import {connect} from 'react-redux';

import MonthlyPayEdit from './MonthlyPayEdit';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';
import RequiresLogin from './requiresLogin'

import './AccountSetup.css';
import { fetchProtectedUser } from '../actions/protected-data';

export class EditProfile extends React.Component {
    
    componentDidMount() {
        if (this.props.notLoaded) {
            this.props.dispatch(fetchProtectedUser);
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
    notLoaded: state.simplify.user === ""
});

export default RequiresLogin()(connect(mapStateToProps)(EditProfile));