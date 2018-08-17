import React from 'react';
import {shallow, mount} from 'enzyme';

import {MonthlyPaySetup} from '../MonthlyPaySetup';

describe('<MonthlyPaySetup />', () => {
    it('Renders without crashing', () => {
        shallow(<MonthlyPaySetup />);
    });
});