import React from 'react';
import {shallow, mount} from 'enzyme';

import {SignupForm} from '../SignupForm';
import { resolve } from 'url';

describe('<SignupForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit = jest.fn();
        shallow(<SignupForm handleSubmit={handleSubmit}/>);
    });

    it('Should run handleSumbit on form submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<SignupForm handleSubmit={handleSubmit}/>);
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should dispatch registerUser and login on onSubmit', () => {
        const handleSubmit = jest.fn();
        const dispatch = jest.fn(() => {
            return Promise.resolve()
        });
        const wrapper = shallow(<SignupForm handleSubmit={handleSubmit} dispatch={dispatch}/>);
        wrapper.instance().onSubmit({
            username: 'username',
            password: 'password',
            firstName: 'John',
            lastName: 'Doe'
        });
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    }); 
}); 