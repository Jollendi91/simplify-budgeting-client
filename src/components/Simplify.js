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

                <Route exact path="/account-setup" render={() => (
                this.props.step === null ? ( 
                    <Redirect to="/dashboard" />
                ) : (
                <AccountSetup type={"account-setup"}/>))}/>

                <Route exact path="/edit-profile" component={() => <EditProfile type={"edit-profile"}/>}/>

                <Route exact path="/dashboard" component={() => <Dashboard categories={this.props.categories}/>}/>

                <Route exact path="/category/:categoryId" component={Category} />

                <Route exact path='/bills' component={Bills} />

            </div>
        )
    }  
};

const mapStateToProps = state => ({
    categories: state.simplify.user.categories,
    pathname: state.router.location.pathname,
    step: state.simplify.user.setupStep,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Simplify);