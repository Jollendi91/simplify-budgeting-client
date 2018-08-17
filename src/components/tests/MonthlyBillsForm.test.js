import React from 'react';
import {shallow, mount} from 'enzyme';

import {MonthlyBillForm} from '../MonthlyBillsForm';

describe('<MonthlyBillForm />', () => {
    it('Renders without crashing', () => {
        shallow(<MonthlyBillForm />);
    });
});