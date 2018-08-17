import React from 'react';
import {shallow, mount} from 'enzyme';

import {Dashboard} from '../Dashboard';

describe('<Dashboard />', () => {
    it('Renders without crashing', () => {
        shallow(<Dashboard />);
    });
});