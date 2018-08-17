import React from 'react';
import {shallow, mount} from 'enzyme';

import {NavBar} from '../NavBar';

describe('<NavBar />', () => {
    it('Renders without crashing', () => {
        shallow(<NavBar />);
    });
});