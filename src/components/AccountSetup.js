import React from 'react';

import './AccountSetup.css';

import MonthlyPaySetup from './MonthlyPaySetup';
import MonthlyPayEdit from './MonthlyPayEdit';
import MonthlyBillsSetup from './MonthlyBillsSetup';
import CategorySetup from './CategorySetup';

export default function AccountSetup(props) {
    let greeting;
    let salaryStatus;

    if(props.type === 'account-setup') {

        greeting = "Let's get setup!";
        salaryStatus = <MonthlyPaySetup />

    }else if (props.type === 'edit-profile') {
        greeting = "Edit your profile";
        salaryStatus = <MonthlyPayEdit />
    }

    return (
        <div>
            <main className="account-setup-container">
                <h1>{greeting}</h1>
                {salaryStatus}
                <MonthlyBillsSetup />
                <CategorySetup />
            </main>
        </div>
    )
};