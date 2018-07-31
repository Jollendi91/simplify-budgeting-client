import React from 'react';

import './AccountSetup.css';

import MonthlyPayEdit from './MonthlyPayEdit';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';

export default function AccountSetup(props) {
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