import React from 'react';
import {connect} from 'react-redux';

import MonthlyPayEdit from './MonthlyPayEdit';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';
import RequiresLogin from './requiresLogin'

import './AccountSetup.css';

export function EditProfile(props) {
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
};

export default RequiresLogin()(connect()(EditProfile));