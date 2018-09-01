import React from 'react';
import {shallow} from 'enzyme';
import {TransRow} from '../TransRow';

describe('<TransRow />', () => {
    it('Renders without crashing', () => {
        shallow(<TransRow />);
    });

    it('Should dispatch deleteTransaction on delete button click', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<TransRow dispatch={dispatch}/>);
        const deleteButton = wrapper.find('.delete-button');
        deleteButton.simulate('click');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should display update form on edit button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<TransRow handleSubmit={handleSubmit}/>);
        const editButton = wrapper.find('.edit-button');
        editButton.simulate('click');
        expect(wrapper.find('UpdateTransactionForm').exists()).toEqual(true);
    });

    it('Should render edit button on cancel button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<TransRow handleSubmit={handleSubmit} />);
        wrapper.instance().setEditing();
        const cancelButton = wrapper.find('.cancel-button');
        cancelButton.simulate('click');
        expect(wrapper.find('.edit-button').exists()).toEqual(true);
    });

    it('Should dispatch updateBill on form submit', () => {
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
        const handleSubmit = jest.fn().mockImplementation(() => wrapper.instance().onSubmit({category: 'category', amount: 200}));
        const wrapper = shallow(<TransRow handleSubmit={handleSubmit} dispatch={dispatch} />);
        wrapper.instance().setEditing();
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});