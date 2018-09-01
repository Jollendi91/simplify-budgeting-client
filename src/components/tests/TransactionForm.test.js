import React from 'react';
import {shallow} from 'enzyme';
import {TransactionForm} from '../TransactionForm';

describe('<TransactionForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit =jest.fn();
        shallow(<TransactionForm handleSubmit={handleSubmit}/>);
    });

    it('Should run handleSubmit on form submit', () => {
        const handleSubmit =jest.fn();
        const wrapper = shallow(<TransactionForm handleSubmit={handleSubmit}/>);
        wrapper.instance().setDisplayForm();
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should dispatch addTransaction on onSubmit', () => {
        const handleSubmit =jest.fn();
        const dispatch = jest.fn(() => Promise.resolve());
        const reset = jest.fn();
        const wrapper = shallow(<TransactionForm handleSubmit={handleSubmit} dispatch={dispatch} reset={reset}/>);
        wrapper.instance().setDisplayForm();
        wrapper.instance().onSubmit({
            transaction: 'transaction',
            date: '2018-08-12',
            amount: 200
        });
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});