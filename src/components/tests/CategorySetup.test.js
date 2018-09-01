import React from 'react';
import {shallow} from 'enzyme';
import {CategorySetup} from '../CategorySetup';
import CatRow from '../CatRow';
import CategoryForm from '../CategoryForm';

const props = {
    categories: [{id: 1}],
    billsTotal: 0,
    categoriesTotal: 0,
    monthlySalary: 0
}

describe('<CategorySetup />', () => {
    it('Renders without crashing', () => {
        shallow(<CategorySetup {...props}/>);
    });

    it('Renders the correct elements', () => {
        const wrapper = shallow(<CategorySetup {...props}/>);
        expect(wrapper.containsAllMatchingElements([
        <CatRow />,
         <CategoryForm />
        ])).toEqual(true);
    });
});