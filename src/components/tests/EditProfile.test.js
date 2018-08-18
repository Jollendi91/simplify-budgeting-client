import React from 'react';
import {shallow, mount} from 'enzyme';

import {EditProfile} from '../EditProfile';
import { MonthlyPayEdit } from '../MonthlyPayEdit';
import { MonthlyBillsSetup } from '../MonthlyBillsSetup';
import { CategorySetup } from '../CategorySetup';

describe('<EditProfile />', () => {
    it('Renders without crashing', () => {
        shallow(<EditProfile />);
    });

    it('Should render the correct elements', () => {
        const wrapper = shallow(<EditProfile />);
        expect(wrapper.containsAllMatchingElements([<MonthlyPayEdit />, <MonthlyBillsSetup />, <CategorySetup/>]));
    });

    it('Should dispatch fetchProtectedUser if not loaded', () => {
        const dispatch = jest.fn();
        shallow(<EditProfile dispatch={dispatch} notLoaded={true} />);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});