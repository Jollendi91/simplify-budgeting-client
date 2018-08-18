import React from 'react';
import {shallow, mount} from 'enzyme';

import {Bills} from '../Bills';

const props = {
    bills: [],
    billsTotal: 0
}

describe('<Bills />', () => {
    it('Renders without crashing', () => {
        shallow(<Bills {...props}/>);
    });
});