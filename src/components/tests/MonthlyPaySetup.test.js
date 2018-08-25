import React from 'react';
import {shallow, mount} from 'enzyme';

import {MonthlyPaySetup} from '../MonthlyPaySetup';

describe('<MonthlyPaySetup />', () => {
    it('Renders without crashing', () => {
        const callback = jest.fn();
        shallow(<MonthlyPaySetup handleSubmit={callback}/>);
    });

    it('Should run handleSubmit on form submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<MonthlyPaySetup handleSubmit={handleSubmit}/>);
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should dispatch updateSalary on onSubmit', () => {
        const handleSubmit = jest.fn();
        const dispatch = jest.fn();
        const wrapper = shallow(<MonthlyPaySetup handleSubmit={handleSubmit} dispatch={dispatch}/>);
        wrapper.instance().onSubmit({monthlySalary: 2000});
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});