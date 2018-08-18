import React from 'react';
import {shallow, mount} from 'enzyme';

import {FilterForm} from '../FilterForm';

describe('<FilterForm />', () => {
    it('Renders without crashing', () => {
        const handleSubmit =jest.fn();
        shallow(<FilterForm handleSubmit={handleSubmit}/>);
    });
});