import React from 'react';
import {shallow} from 'enzyme';
import {Dashboard} from '../Dashboard';
import CategoryModule from '../CategoryModule';

const props = {
    categories: [{id: 1}],
    billsTotal: 0,
    remainingMoney: 0
}

describe('<Dashboard />', () => {
    it('Renders without crashing', () => {
        shallow(<Dashboard {...props}/>);
    });

    it('Should dispatch fetchProtectedUser if not loaded', () => {
        const dispatch = jest.fn();
        shallow(<Dashboard {...props} notLoaded={true} dispatch={dispatch}/>);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should render the correct elements', () => {
        const wrapper = shallow(<Dashboard {...props} step={null}/>);
        expect(wrapper.containsMatchingElement(<CategoryModule />)).toEqual(true);
    });
});