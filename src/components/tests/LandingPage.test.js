import React from 'react';
import {shallow} from 'enzyme';
import {Redirect} from 'react-router-dom';
import {LandingPage} from '../LandingPage';
import { SignupForm } from '../SignupForm';

describe('<LandingPage />', () => {
    it('Renders without crashing', () => {
        shallow(<LandingPage />);
    });

    it('Should redirect if not logged in', () => {
        const wrapper = shallow(<LandingPage loggedIn={true}/>);
        expect(wrapper.containsMatchingElement(<Redirect to="/account-setup"/>));
    });

    it('Should render the correct elements', () => {
        const wrapper = shallow(<LandingPage/>);
        expect(wrapper.containsMatchingElement(<SignupForm/>));
    });
});