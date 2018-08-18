import React from 'react';
import {shallow, mount} from 'enzyme';

import {MonthlyBillsSetup} from '../MonthlyBillsSetup';
import { BillRow } from '../BillRow';
import { MonthlyBillForm } from '../MonthlyBillsForm';


const props = {
    bills: [{id: 1}],
    billsTotal: 0
}

describe('<MonthlyBillsSetup />', () => {
    it('Renders without crashing', () => {
        shallow(<MonthlyBillsSetup {...props}/>);
    });

    it('Should render the correct elements', () => {
        const wrapper = shallow(<MonthlyBillsSetup {...props}/>);
        expect(wrapper.containsAllMatchingElements([<BillRow />, <MonthlyBillForm/>]));
    });
});