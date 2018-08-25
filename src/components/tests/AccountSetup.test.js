import React from 'react';
import {shallow, mount} from 'enzyme';
import {Redirect} from 'react-router-dom';

import {AccountSetup} from '../AccountSetup';
import MonthlyPaySetup from '../MonthlyPaySetup';
import MonthlyBillsSetup from '../MonthlyBillsSetup';
import CategorySetup from '../CategorySetup';

describe('<AccountSetup />', () => {
    it('Renders without crashing', () => {
        shallow(<AccountSetup />);
    });

    it('Should dispatch fetchProtectedUser if no user info in store', () => {
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve({}));
        mount(<AccountSetup notLoaded={true} dispatch={dispatch}/>);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('Should render redirect if setup step is null', () => {
        const wrapper = shallow(<AccountSetup step={null} />);
        expect(wrapper.containsMatchingElement(<Redirect to="/dashboard"/>)).toEqual(true);
    });

    it('Should render monthlyPaySetup if setup step is 1', () => {
        const wrapper = shallow(<AccountSetup step={1} />);
        expect(wrapper.containsMatchingElement(<MonthlyPaySetup />)).toEqual(true);
    });

    describe('Setup Step 2', () => {
        it('Should render MonthlyBillSetup if setup step is 2', () => {
            const wrapper = shallow(<AccountSetup step={2} />);
            expect(wrapper.containsMatchingElement(<MonthlyBillsSetup />)).toEqual(true);
        });

        it('Should dispatch updateStep on back click', () => {
            const dispatch = jest.fn();
            const wrapper = shallow(<AccountSetup step={2} dispatch={dispatch}/>);
            const backButton = wrapper.find('.back-button');
            backButton.simulate('click');
            expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
        });

        it('Should dispatch updateStep on next click', () => {
            const dispatch = jest.fn();
            const wrapper = shallow(<AccountSetup step={2} dispatch={dispatch}/>);
            const nextButton = wrapper.find('.next-button');
            nextButton.simulate('click');
            expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
        });
    });

    describe('Setup Step 3', () => {
        it('Should render CategorySetup if setup step is 3', () => {
            const wrapper = shallow(<AccountSetup step={3} />);
            expect(wrapper.containsMatchingElement(<CategorySetup />)).toEqual(true);
        });

        it('Should dispatch updateStep on back click', () => {
            const dispatch = jest.fn();
            const wrapper = shallow(<AccountSetup step={3} dispatch={dispatch}/>);
            const backButton = wrapper.find('.back-button');
            backButton.simulate('click');
            expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
        });

        it('Should dispatch updateStep on finish click', () => {
            const dispatch = jest.fn();
            const wrapper = shallow(<AccountSetup step={3} dispatch={dispatch}/>);
            const finishButton = wrapper.find('.finish-button');
            finishButton.simulate('click');
            expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
        });
    });
});