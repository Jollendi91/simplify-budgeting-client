import React from 'react';
import {shallow, mount} from 'enzyme';

import {CategoryForm} from '../CategoryForm';

describe('<CategoryForm />', () => {
    it('Renders without crashing', () => {
        shallow(<CategoryForm />);
    });
});