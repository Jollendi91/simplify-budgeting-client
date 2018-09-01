import React from 'react';
import {shallow} from 'enzyme';
import {BillRow} from '../BillRow';

describe('<BillRow />', () => {
    it('Renders without crashing', () => {
        shallow(<BillRow />);
    });

    it('Should dispatch deleteBill on delete button click', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<BillRow dispatch={dispatch}/>);
        const deleteButton = wrapper.find('.delete-button');
        deleteButton.simulate('click');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should display update form on edit button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<BillRow handleSubmit={handleSubmit}/>);
        const editButton = wrapper.find(".edit-button");
        editButton.simulate('click');
        expect(wrapper.find('UpdateBillForm').exists()).toEqual(true);
    });

    it('Should render edit button on cancel button click', () => {
        const handleSubmit = jest.fn();
        const wrapper = shallow(<BillRow handleSubmit={handleSubmit} />);
        wrapper.instance().setEditing();
        const cancelButton = wrapper.find('.cancel-button');
        cancelButton.simulate('click');
        expect(wrapper.find('.edit-button').exists()).toEqual(true);
    });

    it('Should dispatch updateBill on form submit', () => {
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
        const handleSubmit = jest.fn().mockImplementation(() => wrapper.instance().onSubmit({bill: 'bill', amount: 200}));
        const wrapper = shallow(<BillRow handleSubmit={handleSubmit} dispatch={dispatch} />);
        wrapper.instance().setEditing();
        wrapper.simulate('submit');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(expect.any(Function));
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});