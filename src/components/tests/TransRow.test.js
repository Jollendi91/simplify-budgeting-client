import React from 'react';
import {shallow, mount} from 'enzyme';

import {TransRow} from '../TransRow';

describe('<TransRow />', () => {
    it('Renders without crashing', () => {
        shallow(<TransRow />);
    });
});