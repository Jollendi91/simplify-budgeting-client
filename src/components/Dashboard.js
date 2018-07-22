import React from 'react';

import './Dashboard.css';

export default function Dashboard(props) {
    return (
        <div className='dashboard-container'>
            <header class="main-header">
                <section class="portfolio-data">
                    <p>[graph of data]</p>
                </section>
            </header>
            <main>
                <section class="spending">
                    <header><h1>Spending</h1></header>
                    <h2>Remaining $500.00</h2>
                </section>
                <section class="debts">
                    <header><h1>Category [2]</h1></header>
                    <h2>$2500.00</h2>
                </section>
                <section class="savings">
                    <header><h1>Savings</h1></header>
                    <h2>$3000.00</h2>
                </section>
            </main>
        </div>
    )
}

