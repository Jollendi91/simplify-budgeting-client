import React from 'react';

import './AccountSetup.css';

import MonthlyPaySetup from './MonthlyPaySetup';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';

export default function AccountSetup(props) {
    return (
        <main className="account-setup-container">
            <h1>Let's get setup!</h1>
            <MonthlyPaySetup />
            <MonthlyBillsSetup />
            <CategorySetup onClick={props.onClick} />
        </main>
    )
};