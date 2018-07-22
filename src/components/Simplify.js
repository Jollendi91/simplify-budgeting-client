import React from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import NavBar from './NavBar';
import LandingPage from './LandingPage';
import AccountSetup from './AccountSetup';
import Dashboard from './Dashboard';

export default class Simplify extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            page: 'signup'
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

                    <Route exact path="/account-setup" component={() => <AccountSetup onClick={page => this.updatePage(page)}/>}/>

                    <Route exact path="/dashboard" component={Dashboard}/>

                </div>
            </BrowserRouter>
        )
    }
    
}