import React from 'react';
import {shallow, mount} from 'enzyme';

import {CategorySetup} from '../CategorySetup';

describe('<CategorySetup />', () => {
    it('Renders without crashing', () => {
        shallow(<CategorySetup />);
    });
});