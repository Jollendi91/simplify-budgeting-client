import React from 'react';
import {shallow, mount} from 'enzyme';

import {CategoryModule} from '../CategoryModule';

describe('<CategoryModule />', () => {
    it('Renders without crashing', () => {
        shallow(<CategoryModule />);
    });
});