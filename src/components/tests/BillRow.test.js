import React from 'react';
import {shallow, mount} from 'enzyme';

import {BillRow} from '../BillRow';

describe('<BillRow />', () => {
    it('Renders without crashing', () => {
        shallow(<BillRow />);
    });
});