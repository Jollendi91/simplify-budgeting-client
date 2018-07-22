import React from 'react';

import NavBar from './NavBar';
import './Bills.css';

export default function Bills(props) {
    return (
        <div>
            <NavBar page={'dashboard'} />
            <main className='bills-container'>
                <header>
                    <h1>Monthly Bills</h1>
                    <h2>$520.00/Month</h2>
                </header>
                <section class="monthly-bills-form-container">
                    <form>
                        <div>
                            <label for="description">Description</label>
                            <input type="text" name="description" placeholder="Rent, Utilities, etc." id="description" />
                        </div>
                        <div>
                            <label for="amount">Amount</label>
                            <input type="number" step="0.01" name="amount" id="amount" min="0.01" />
                        </div>
                        <button>Add Bill</button>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th colspan="2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rent</td>
                                <td>$450.00</td>
                                <td>X</td>
                            </tr>
                            <tr>
                                <td>Electricity</td>
                                <td>$70.00</td>
                                <td>X</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td>Total</td>
                            <td colspan="2">$520.00</td>
                        </tfoot>
                    </table>
                </section>
            </main>
        </div>
    )
}