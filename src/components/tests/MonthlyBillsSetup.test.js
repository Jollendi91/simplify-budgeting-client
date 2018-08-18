import React from 'react';
import {shallow, mount} from 'enzyme';

import {MonthlyBillsSetup} from '../MonthlyBillsSetup';


const props = {
    bills: [],
    billsTotal: 0
}
describe('<MonthlyBillsSetup />', () => {
    it('Renders without crashing', () => {
        shallow(<MonthlyBillsSetup {...props}/>);
    });
});