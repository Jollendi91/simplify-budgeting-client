import React from 'react';
import {shallow, mount} from 'enzyme';

import {Category} from '../Category';

describe('<Category />', () => {
    it('Renders without crashing', () => {
        shallow(<Category />);
    });
});