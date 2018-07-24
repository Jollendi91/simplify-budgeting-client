import React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import LandingPage from './LandingPage';
import AccountSetup from './AccountSetup';
import Dashboard from './Dashboard';
import Category from './Category';
import Bills from './Bills';

export function Simplify(props) {

    return (
        <BrowserRouter>
            <div className="app-container">
                
                <Route exact path="/" component={LandingPage}/>

                <Route exact path="/account-setup" component={() => <AccountSetup type={"account-setup"}/>}/>

                <Route exact path="/edit-profile" component={() => <AccountSetup type={"edit-profile"}/>}/>

                <Route exact path="/dashboard" component={() => <Dashboard categories={props.categories}/>}/>

                <Route exact path="/category/:categoryId" component={Category} />

                <Route exact path='/bills' component={Bills} />

            </div>
        </BrowserRouter>
    )
};

const mapStateToProps = state => ({
    page: state.page,
    categories: state.categories
});

export default connect(mapStateToProps)(Simplify);