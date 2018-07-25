import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import LandingPage from './LandingPage';
import AccountSetup from './AccountSetup';
import EditProfile from './EditProfile';
import Dashboard from './Dashboard';
import Category from './Category';
import Bills from './Bills';
import NavBar from './NavBar';

export function Simplify(props) {

    return (
            <div className="app-container">
                <NavBar page={props.pathname} />
                
                <Route exact path="/" component={LandingPage}/>

                <Route exact path="/account-setup" component={() => <AccountSetup type={"account-setup"}/>}/>

                <Route exact path="/edit-profile" component={() => <EditProfile type={"edit-profile"}/>}/>

                <Route exact path="/dashboard" component={() => <Dashboard categories={props.categories}/>}/>

                <Route exact path="/category/:categoryId" component={Category} />

                <Route exact path='/bills' component={Bills} />

            </div>
    )
};

const mapStateToProps = state => ({
    page: state.page,
    categories: state.categories,
    pathname: state.router.location.pathname
});

export default connect(mapStateToProps)(Simplify);