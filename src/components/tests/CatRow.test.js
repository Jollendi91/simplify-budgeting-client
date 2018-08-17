import React from 'react';
import {shallow, mount} from 'enzyme';

import {CatRow} from '../CatRow';

describe('<CatRow />', () => {
    it('Renders without crashing', () => {
        shallow(<CatRow />);
    });
});