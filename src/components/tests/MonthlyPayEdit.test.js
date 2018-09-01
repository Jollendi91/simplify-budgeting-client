import React from 'react';
import {shallow} from 'enzyme';
import {MonthlyPayEdit} from '../MonthlyPayEdit';

describe('<MonthlyPayEdit />', () => {
    it('Renders without crashing', () => {
        shallow(<MonthlyPayEdit />);
    });

    it('Should display form on edit button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<MonthlyPayEdit handleSubmit={handleSubmit}/>);
        const editButton = wrapper.find('.edit-button');
        editButton.simulate('click');
        expect(wrapper.find('form[className="update-salary-form"]').exists()).toEqual(true);
    });

    it('Should hide form on cancel button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<MonthlyPayEdit handleSubmit={handleSubmit}/>);
        wrapper.instance().setEditing();
        const cancelButton = wrapper.find('.cancel-button');
        cancelButton.simulate('click');
        expect(wrapper.find('form[className="update-salary-form"]').exists()).toEqual(false);
    });

    it('Should run handleSubmit on form submit', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<MonthlyPayEdit handleSubmit={handleSubmit}/>);
        wrapper.instance().setEditing();
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should dispatch updateSalary on onSubmit', () => {
        const handleSubmit = jest.fn();
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
        const wrapper = shallow(<MonthlyPayEdit handleSubmit={handleSubmit} dispatch={dispatch}/>);
        wrapper.instance().setEditing();
        wrapper.instance().onSubmit({monthlySalary: 2000});
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});