import React from 'react';
import {shallow} from 'enzyme';
import {CatRow} from '../CatRow';
import Warning from '../Warning';

describe('<CatRow />', () => {
    it('Renders without crashing', () => {
        shallow(<CatRow />);
    });

    it('Should display Warning on delete button click', () => {
        const wrapper = shallow(<CatRow />);
        const deleteButton = wrapper.find('.delete-button');
        deleteButton.simulate('click');
        expect(wrapper.find(Warning).exists()).toEqual(true);
    });

    it('Should display update form on edit button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<CatRow handleSubmit={handleSubmit}/>);
        const editButton = wrapper.find('.edit-button');
        editButton.simulate('click');
        expect(wrapper.find('UpdateCategoryForm').exists()).toEqual(true);
    });

    it('Should render edit button on cancel button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<CatRow handleSubmit={handleSubmit} />);
        wrapper.instance().setEditing();
        const cancelButton = wrapper.find('.cancel-button');
        cancelButton.simulate('click');
        expect(wrapper.find('.edit-button').exists()).toEqual(true);
    });

    it('Should dispatch updateBill on form submit', () => {
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
        const handleSubmit = jest.fn().mockImplementation(() => wrapper.instance().onSubmit({category: 'category', amount: 200}));
        const wrapper = shallow(<CatRow handleSubmit={handleSubmit} dispatch={dispatch} />);
        wrapper.instance().setEditing();
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});
