import React from 'react';
import {shallow} from 'enzyme';

import {Category} from '../Category';
import TransRow from '../TransRow';
import NavBar from '../NavBar';
import FilterForm from '../FilterForm';
import TransactionForm from '../TransactionForm';

const props = {
    category: {
        transactions:[{id: 1}]
    }
}

describe('<Category />', () => {
    it('Renders without crashing', () => {
        shallow(<Category {...props}/>);
    });

    it('Should dispatch fetchProtectedUser if not loaded', () => {
        const dispatch = jest.fn();
        shallow(<Category dispatch={dispatch} notLoaded={true} props={props}/>);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    }); 

    it('Should render correct elements', () => {
        const wrapper = shallow(<Category {...props}/>);
        expect(wrapper.containsAllMatchingElements([<TransRow />, <NavBar />, <FilterForm />, <TransactionForm />])).toEqual(true);
    });
});