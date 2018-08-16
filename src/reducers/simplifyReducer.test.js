import {simplifyReducer} from './protected-data';
import * as actions from '../actions/protected-data';

describe('simplifyReducer', () => {
    //Test Data
    const bill1 = {id: 1, bill: 'bill1', amount: 10};
    const bill2 ={id: 2, bill: 'bill2', amount: 20};

    const transaction1 = {id: 1, transaction: 'transaction1', date: '2018-08-16', amount: 10};
    const transaction2 = {id: 2, transaction: 'transaction2', date: '2018-08-16', amount: 20};
    const transaction3 = {id: 3, transaction: 'transaction3', date: '2018-08-16', amount: 30}

    const category1 = {id: 1, category: 'category1', amount: 100, transactions: [transaction1, transaction2]};
    const category2 = {id: 2, category: 'category2', amount: 200, transactions: [transaction3]};
    const category3 = {id: 3, category: 'category2', amount: 300, transactions: []};

    const user = {
        id: 1,
        username: 'fakeUser',
        setupStep: 1,
        monthlySalary: '2000',
        bills: [bill1, bill2],
        categories: [category1, category2]
    };


    it('Should set the initial state when nothing is passed in', () => {
        const state = simplifyReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual({
            user: {
                id: null, 
                username: '',
                setupStep: 1,
                monthlySalary: '0',
                bills: [],
                categories: []
            },
            error: null
        });
    });

    it('Should return the current state on an unkown action', () => {
        let currentState = {};
        const state = simplifyReducer(currentState, {type: '__UNKOWN'});
        expect(state).toBe(currentState);
    });

    describe('fetchProtectedUserSuccess', () => {
        it('Should set the user', () => {
            let state;
            state = simplifyReducer(state, actions.fetchProtectedUserSuccess(user));
            expect(state).toEqual({
                user: user,
                error: null
            });
        });
    });
});
