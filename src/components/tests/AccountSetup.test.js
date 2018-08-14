import React from 'react';
import {shallow, mount} from 'enzyme';

import {AccountSetup} from '../AccountSetup';

describe('<AccountSetup />', () => {
    it('Renders without crashing', () => {
        shallow(<AccountSetup />);
    });
});