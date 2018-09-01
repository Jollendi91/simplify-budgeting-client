import React from 'react';
import {shallow} from 'enzyme';
import {Redirect} from 'react-router-dom';
import {LandingPage} from '../LandingPage';

describe('<LandingPage />', () => {
    it('Renders without crashing', () => {
        shallow(<LandingPage />);
    });

    it('Should redirect if not logged in', () => {
        const wrapper = shallow(<LandingPage loggedIn={true}/>);
        expect(wrapper.containsMatchingElement(<Redirect to="/account-setup"/>)).toEqual(true);
    });
});