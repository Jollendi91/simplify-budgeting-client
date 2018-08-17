import React from 'react';
import {shallow, mount} from 'enzyme';

import {TransactionForm} from '../TransactionForm';

describe('<TransactionForm />', () => {
    it('Renders without crashing', () => {
        shallow(<TransactionForm />);
    });
});