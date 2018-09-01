import React from 'react';
import {shallow} from 'enzyme';
import {Warning} from '../Warning';

describe('<Warning />', () => {
    it('Renders without crashing', () => {
        shallow(<Warning />);
    });

    it('Should dispatch deleteCategory on confirm delete click', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<Warning dispatch={dispatch} />);
        const confirmDeleteButton = wrapper.find('.confirm-delete');
        confirmDeleteButton.simulate('click');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});