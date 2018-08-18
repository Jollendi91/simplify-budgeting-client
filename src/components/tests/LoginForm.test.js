import React from 'react';
import {shallow, mount} from 'enzyme';

import {LoginForm} from '../LoginForm';

describe('<LoginForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit = jest.fn();
        shallow(<LoginForm handleSubmit={handleSubmit} />);
    });
});