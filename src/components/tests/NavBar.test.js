import React from 'react';
import {shallow} from 'enzyme';
import {NavBar} from '../NavBar';
import { LoginForm } from '../LoginForm';
import { clearAuth } from '../../actions/auth';

describe('<NavBar />', () => {
    it('Renders without crashing', () => {
        shallow(<NavBar />);
    });

    it('Should render login form on root path', () => {
        const wrapper = shallow(<NavBar page="/" />);
        expect(wrapper.containsMatchingElement(<LoginForm/>));
    });

    it('Should render correct buttons on account-setup page', () => {
        const wrapper = shallow(<NavBar loggedIn={true} page="/account-setup"/>);
        expect(wrapper.find('li[className="logout-button"]').exists()).toEqual(true);
    });

    it('Should render correct buttons on any other page', () => {
        const wrapper = shallow(<NavBar loggedIn={true}/>);
        expect(wrapper.containsAllMatchingElements([<li>Dashboard</li>, <li>Edit Profile</li>, <li>Bills</li>, <li className="logout-button">Log out</li>])).toEqual(true);
    });

    it('Should dispatch clearAuth on logOut', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<NavBar dispatch={dispatch} loggedIn={true}/>);
        const logOutButton = wrapper.find('li[className="logout-button"]');
        logOutButton.simulate('click');
        expect(dispatch).toHaveBeenCalledWith(clearAuth());
    });
});