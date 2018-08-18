import React from 'react';
import {shallow, mount} from 'enzyme';

import {Dashboard} from '../Dashboard';

const props = {
    categories: [],
    billsTotal: 0,
    remainingMoney: 0
}

describe('<Dashboard />', () => {
    it('Renders without crashing', () => {
        shallow(<Dashboard {...props}/>);
    });
});