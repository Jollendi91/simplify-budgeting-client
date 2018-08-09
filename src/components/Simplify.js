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
import {refreshAuthToken} from '../actions/auth';

export class Simplify extends React.Component {
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
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Simplify);