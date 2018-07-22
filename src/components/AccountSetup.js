import React from 'react';

import './AccountSetup.css';

import MonthlyPaySetup from './MonthlyPaySetup';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';

export default function AccountSetup(props) {
    let greeting;

    if(props.type === 'account-setup') {
        greeting = "Let's get setup!";
    }else if (props.type === 'edit-profile') {
        greeting = "Edit your profile"
    }

    return (
        <main className="account-setup-container">
            <h1>{greeting}</h1>
            <MonthlyPaySetup />
            <MonthlyBillsSetup />
            <CategorySetup onClick={props.onClick} {...props}/>
        </main>
    )
};