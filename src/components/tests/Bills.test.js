import React from 'react';
import {shallow, mount} from 'enzyme';

import {Bills} from '../Bills';

describe('<Bills />', () => {
    it('Renders without crashing', () => {
        shallow(<Bills />);
    });
});