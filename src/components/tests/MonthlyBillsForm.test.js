import React from 'react';
import {shallow} from 'enzyme';
import {MonthlyBillForm} from '../MonthlyBillsForm';

describe('<MonthlyBillForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit = jest.fn();
        shallow(<MonthlyBillForm handleSubmit={handleSubmit}/>);
    });

    it('Should run handleSumbit on form submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<MonthlyBillForm handleSubmit={handleSubmit}/>);
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should dispatch addBill on onSubmit', () => {
        const handleSubmit = jest.fn();
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
        const reset = jest.fn();
        const wrapper = shallow(<MonthlyBillForm handleSubmit={handleSubmit} dispatch={dispatch} reset={reset}/>);
        wrapper.instance().onSubmit({bill: 'bill', amount: 100});
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));        
    });
});