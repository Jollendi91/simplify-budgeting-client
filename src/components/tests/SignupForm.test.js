import React from 'react';
import {shallow, mount} from 'enzyme';

import {SignupForm} from '../SignupForm';

describe('<SignupForm />', () => {
    it('Renders without crashing', () => {
        shallow(<SignupForm />);
    });
});