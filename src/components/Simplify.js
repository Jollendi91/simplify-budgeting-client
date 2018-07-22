import React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage';
import AccountSetup from './AccountSetup';
import Dashboard from './Dashboard';
import Category from './Category';
import Bills from './Bills';

export default class Simplify extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            page: 'signup',
            categories: [
                {
                    categoryName: 'Spending',
                    categoryAmount: '$500'
                },
                {
                    categoryName: 'Debts',
                    categoryAmount: '$2500'
                },
                {
                    categoryName: 'Savings',
                    categoryAmount: '$3000'
                }
            ]
        }
    }

    updatePage(page) {
        this.setState({
            page
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <header>
                        <NavBar page={this.state.page} onClick={page => this.updatePage(page)} />
                    </header>
    
                    <Route exact path="/" component={LandingPage}/>

                    <Route exact path="/account-setup" component={() => <AccountSetup type={"account-setup"} onClick={page => this.updatePage(page)}/>}/>

                    <Route exact path="/edit-profile" component={() => <AccountSetup type={"edit-profile"}/>}/>

                    <Route exact path="/dashboard" component={() => <Dashboard categories={this.state.categories}/>}/>

                    <Route exact path="/category/:categoryName" component={Category} />

                    <Route exact path='/bills' component={Bills} />

                </div>
            </BrowserRouter>
        )
    }
    
}