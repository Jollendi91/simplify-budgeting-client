import React from 'react';
import {shallow, mount} from 'enzyme';

import {FilterForm} from '../FilterForm';

describe('<FilterForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit =jest.fn();
        shallow(<FilterForm handleSubmit={handleSubmit}/>);
    });

    it('Should run handleSubmit on form submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<FilterForm handleSubmit={handleSubmit} />);
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should run updateFilters and dispatch fetchTransactions on onSumbit', () => {
        const dispatch = jest.fn();
        const handleSubmit = jest.fn();
        const updateFilters = jest.fn();
        const wrapper = shallow(<FilterForm dispatch={dispatch} handleSubmit={handleSubmit} updateFilters={updateFilters}/>);
        wrapper.instance().onSubmit({filterMonth: 7, filterYear: 2018});
        expect(updateFilters).toHaveBeenCalledTimes(1);
        expect(updateFilters).toHaveBeenCalledWith(7, 2018);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});