import React from 'react';
import {shallow, mount} from 'enzyme';

import {MonthlyPayEdit} from '../MonthlyPayEdit';

describe('<MonthlyPayEdit />', () => {
    it('Renders without crashing', () => {
        shallow(<MonthlyPayEdit />);
    });
});