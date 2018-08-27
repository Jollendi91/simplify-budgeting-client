import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import LandingPage from './LandingPage';
import AccountSetup from './AccountSetup';
import EditProfile from './EditProfile';
import Dashboard from './Dashboard';
import Category from './Category';
import Bills from './Bills';
import NavBar from './NavBar';
import {refreshAuthToken} from '../actions/auth';

import {injectGlobal} from 'styled-components';
import {modernNormalize} from 'styled-modern-normalize';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faBars, faTimes, faAngleRight, faAngleLeft, faCaretLeft} from '@fortawesome/free-solid-svg-icons';
import {faEdit, faTrashAlt, faSave} from '@fortawesome/free-regular-svg-icons';

library.add(faBars, faEdit, faTrashAlt, faSave, faTimes, faAngleRight, faAngleLeft, faCaretLeft);

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Cabin|Roboto+Condensed:700');

    ${modernNormalize};

    * {
        box-sizing: border-box;
        font-family: 'Cabin'
    }

    body, html {
        height: 100%;
        margin: 0;
    }

    body {
        min-height: 100vh;
        font-family: sans-serif;
        font-size: 1em;
        text-align: center;
        line-height: 1.5;
        background-color: #DEDCE3;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 10px 0;
    }

    h1, h2, h3, h4, h5, h6, th, button {
        font-family: 'Roboto Condensed';
    }
`;

export class App extends React.Component {

    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000
        )
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }
        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app-container">
                <NavBar page={this.props.pathname} />
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/account-setup" component={AccountSetup}/>
                <Route exact path="/edit-profile" component={EditProfile}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/category/:categoryId" component={Category} />
                <Route exact path='/bills' component={Bills} />
            </div>
        )
    }  
};

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    loggedIn: state.auth.currentUser !== null,
    notLoaded: state.simplify.user.id === null
});

export default connect(mapStateToProps)(App);