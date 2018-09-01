import React from 'react';
import {shallow} from 'enzyme';
import {CategoryForm} from '../CategoryForm';

describe('<CategoryForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit = jest.fn();
        shallow(<CategoryForm handleSubmit={handleSubmit}/>);
    });

    it('Should dispatch handleSubmit on form submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<CategoryForm handleSubmit={handleSubmit} />);
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should dispatch addCategory on onSubmit', () => {
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
        const handleSubmit = jest.fn();
        const reset = jest.fn();
        const wrapper = shallow(<CategoryForm handleSubmit={handleSubmit} dispatch={dispatch} reset={reset}/>);
        wrapper.instance().onSubmit({category: 'category', amount: 10});
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});