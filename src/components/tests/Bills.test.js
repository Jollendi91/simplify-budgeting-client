import React from 'react';
import {shallow, mount} from 'enzyme';

import {Bills} from '../Bills';
import { BillRow } from '../BillRow';
import { NavBar } from '../NavBar';
import { MonthlyBillForm } from '../MonthlyBillsForm';

const props = {
    bills: [{id: 1}],
    billsTotal: 0
}

describe('<Bills />', () => {
    it('Renders without crashing', () => {
        shallow(<Bills {...props}/>);
    });

    it('Should dispatch fetchProtectedUser if not loaded', () => {
        const dispatch = jest.fn();
        shallow(<Bills dispatch={dispatch} notLoaded={true} {...props}/>);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should render correct elements', () => {
        const wrapper = shallow(<Bills {...props}/>);
        expect(wrapper.containsAllMatchingElements([<BillRow />,<NavBar />, <MonthlyBillForm />, ]));
    });
});