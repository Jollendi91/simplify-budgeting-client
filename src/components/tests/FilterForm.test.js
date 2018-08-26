import React from 'react';
import {shallow} from 'enzyme';

import {FilterForm} from '../FilterForm';

describe('<FilterForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit =jest.fn();
        shallow(<FilterForm handleSubmit={handleSubmit}/>);
    });

    it('Should run updateFilters and dispatch fetchTransactions on back click', () => {
        const dispatch = jest.fn();
        const updateFilters = jest.fn();
        const wrapper = shallow(<FilterForm dispatch={dispatch} updateFilters={updateFilters}/>);
        const backButton = wrapper.find('.back-button');
        backButton.simulate('click');
        expect(updateFilters).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should run updateFilters and dispatch fetchTransactions on next click', () => {
        const dispatch = jest.fn();
        const updateFilters = jest.fn();
        const wrapper = shallow(<FilterForm dispatch={dispatch} updateFilters={updateFilters}/>);
        const nextButton = wrapper.find('.next-button');
        nextButton.simulate('click');
        expect(updateFilters).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});