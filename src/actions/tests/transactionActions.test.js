import * as actions from '../protected-data';
import {API_BASE_URL} from '../../config';
import { get } from 'http';

// Get Transactions Action
describe('fetchTransactionsSuccess', () => {
    it('Should return the action', () => {
        const transactions = [
            {
                id: 1, 
                transaction: 'Movie',
                date: '2018-08-11',
                amount: 10
            },
            {
                id: 2,
                transaction: 'Groceries',
                date: '2018-08-12',
                amount: 50
            }
        ];
        const categoryId = 2;
        const action = actions.fetchTransactionsSuccess(transactions, categoryId);
        expect(action.type).toEqual(actions.FETCH_TRANSACTIONS_SUCCESS);
        expect(action.transactions).toEqual(transactions);
        expect(action.transactions).toHaveLength(2);
        expect(action.categoryId).toEqual(categoryId);
    });
});

describe('fetchTransactionsError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.fetchTransactionsError(error);
        expect(action.type).toEqual(actions.FETCH_TRANSACTIONS_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('fetchTransactions', () => {
    it('Should dispatch fetchTransactionsSuccess', () => {
        const transactions = {
            transactions: [{
                id: 1, 
                transaction: 'Movie',
                date: '2018-08-11',
                amount: 10
            },
            {
                id: 2,
                transaction: 'Groceries',
                date: '2018-08-12',
                amount: 50
            }]  
        };
        const month = 7;
        const year = 2018;
        const categoryId = 2;

        global.fetch = jest.fn().mockImplementation(() =>{
            return Promise.resolve({
                ok: true,
                json() {
                    return transactions;
                }
            });
        });

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));

        return actions.fetchTransactions(month, year, categoryId)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/transactions/category/${categoryId}?year=${year}&month=${month}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getState().auth.authToken}`
                }
            });
            expect(dispatch).toHaveBeenCalledWith(actions.fetchTransactionsSuccess(transactions.transactions, categoryId));
        });
    });
});

// Add Transaction Action
describe('addTransactionSuccess', () => {
    it('Should return the action', () => {
        const {id, transaction, date, amount} = {
            id: 1,
            transaction: 'Movie',
            date: '2018-08-11',
            amount: 10
        }
        const categoryId = 2;
        const action = actions.addTransactionSuccess(id, transaction, date, amount, categoryId);
        expect(action.type).toEqual(actions.ADD_TRANSACTION_SUCCESS);
        expect(action.transId).toEqual(id);
        expect(action.transName).toEqual(transaction);
        expect(action.transDate).toEqual(date);
        expect(action.transAmount).toEqual(amount);
        expect(action.categoryId).toEqual(categoryId);
    });
});

describe('addTransactionError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.addTransactionError(error);
        expect(action.type).toEqual(actions.ADD_TRANSACTION_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('', () => {
    it('', () => {

    });
});