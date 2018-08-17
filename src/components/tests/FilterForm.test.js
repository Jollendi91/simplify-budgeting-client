import React from 'react';
import {shallow, mount} from 'enzyme';

import {FilterForm} from '../FilterForm';

describe('<FilterForm />', () => {
    it('Renders without crashing', () => {
        shallow(<FilterForm />);
    });
});