import React from 'react';

import './AccountSetup.css';

import NavBar from './NavBar';
import MonthlyPaySetup from './MonthlyPaySetup';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';

export default function AccountSetup(props) {
    let greeting;
    let navStatus;

    if(props.type === 'account-setup') {
        navStatus = <NavBar page={'setup'}/>;

        greeting = "Let's get setup!";

    }else if (props.type === 'edit-profile') {
        navStatus = <NavBar page={'dashboard'} />;
        greeting = "Edit your profile";
    }

    return (
        <div>
            {navStatus}
            <main className="account-setup-container">
                <h1>{greeting}</h1>
                <MonthlyPaySetup />
                <MonthlyBillsSetup />
                <CategorySetup onClick={props.onClick} {...props}/>
            </main>
        </div>
    )
};