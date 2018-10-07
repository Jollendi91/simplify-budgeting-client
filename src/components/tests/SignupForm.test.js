import React from 'react';
import {shallow} from 'enzyme';
import {SignupForm} from '../SignupForm';

describe('<SignupForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit = jest.fn();
        shallow(<SignupForm handleSubmit={handleSubmit}/>);
    });

    it('Should run handleSumbit on form submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<SignupForm handleSubmit={handleSubmit} hideForm={jest.fn()}/>);
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should dispatch registerUser and login on onSubmit', () => {
        const handleSubmit = jest.fn();
        const dispatch = jest.fn(() => {
            return Promise.resolve()
        });
        const wrapper = shallow(<SignupForm handleSubmit={handleSubmit} dispatch={dispatch} hideForm={jest.fn()}/>);
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