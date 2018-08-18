import React from 'react';
import {shallow, mount} from 'enzyme';

import {AccountSetup} from '../AccountSetup';
import {fetchProtectedUser} from '../../actions/protected-data';

describe('<AccountSetup />', () => {
    it('Renders without crashing', () => {
        shallow(<AccountSetup />);
    });

    it('Should dispatch fetchProtectedUser if no user info in store', () => {
        const dispatch = jest.fn().mockImplementation(() => Promise.resolve({}));
        mount(<AccountSetup notLoaded={true} dispatch={dispatch}/>);
        const callback = fetchProtectedUser();
        expect(dispatch).toHaveBeenCalledWith(callback);
    });
});