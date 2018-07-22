import React from 'react';


export default function Category(props) {
    return (
        <div className="category-container">
            <header>
                <h1>{props.categoryName}</h1>
                <div class="category-header">
                    <h2>{props.categoryAmount}/Month</h2>
                    <div>
                        <h1>July</h1>
                        <select name="transaction-data-month">
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option selected>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                        <select name="transaction-data-year">
                            <option>2017</option>
                            <option selected>2018</option>
                        </select>
                    </div>
                </div>
            </header>
            <main>
                <section class="progress-bar">
                    <p>Spent so far: $350 / $700</p>
                    <p>[Progress Bar]</p>
                </section>
                <section>
                    <form>
                        <div>
                            <label for="transaction-description">Description</label>
                            <input type="type" name="transaction-description" id="transaction-description" />
                        </div>
                        <div>
                            <label for="transaction-date">Transaction Date</label>
                            <input type="date" name="transaction-date" id="transaction-date" />
                        </div>
                        <div>
                            <label for="account-amount">Amount</label>
                            <input type="number" step="0.01" min="0" name="account-amount" id="account-amount" />
                        </div>
                        <button type="submit">Add Transaction</button>
                    </form>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th colspan="2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Groceries - Aldi</td>
                                    <td>07/07/2018</td>
                                    <td>$75.00</td>
                                    <td>X</td>
                                </tr>
                                <tr>
                                    <td>Gas</td>
                                    <td>07/16/2018</td>
                                    <td>$25.00</td>
                                    <td>X</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}