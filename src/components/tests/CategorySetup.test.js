import React from 'react';
import {shallow, mount} from 'enzyme';

import {CategorySetup} from '../CategorySetup';

const props = {
    categories: [],
    billsTotal: 0,
    categoriesTotal: 0,
    monthlySalary: 0
}

describe('<CategorySetup />', () => {
    it('Renders without crashing', () => {
        shallow(<CategorySetup {...props}/>);
    });
});