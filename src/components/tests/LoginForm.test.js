import React from 'react';
import {shallow} from 'enzyme';
import {LoginForm} from '../LoginForm';

describe('<LoginForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit = jest.fn();
        shallow(<LoginForm handleSubmit={handleSubmit} />);
    });

    it('Should run handleSubmit on form submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} hideForm={jest.fn()}/>);
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should dispatch login on onSubmit', () => {
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
        const handleSubmit = jest.fn();
        const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} dispatch={dispatch} hideForm={jest.fn()}/>);
        wrapper.instance().onSubmit({username: 'username', password: 'password'});
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});