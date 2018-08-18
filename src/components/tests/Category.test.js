import React from 'react';
import {shallow, mount} from 'enzyme';

import {Category} from '../Category';

const props = {
    category: {
        transactions:[]
    }
}

describe('<Category />', () => {
    it('Renders without crashing', () => {
        shallow(<Category {...props}/>);
    });
});