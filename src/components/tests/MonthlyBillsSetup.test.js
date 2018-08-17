import React from 'react';
import {shallow, mount} from 'enzyme';

import {MonthlyBillsSetup} from '../MonthlyBillsSetup';

describe('<MonthlyBillsSetup />', () => {
    it('Renders without crashing', () => {
        shallow(<MonthlyBillsSetup />);
    });
});