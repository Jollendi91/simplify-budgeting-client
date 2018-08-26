import React from 'react';
import {shallow} from 'enzyme';

import {CategoryModule} from '../CategoryModule';

describe('<CategoryModule />', () => {
    it('Renders without crashing', () => {
        shallow(<CategoryModule amount={0} currentCategory={{transactions: []}}/>);
    });
});