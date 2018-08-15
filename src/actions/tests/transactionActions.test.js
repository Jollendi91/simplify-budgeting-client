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

describe('addTransaction', () => {
    it('Should dispatch addTransactionSuccess', () => {
        const fakeTransaction = {
            id: 1,
            transaction: 'Movie',
            date: '2018-08-11',
            amount: 10
        }
        const {id,transaction, date, amount} = fakeTransaction;
        const categoryId = 2;

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true, 
                json() {
                    return fakeTransaction
                }
            });
        });

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));
        
        return actions.addTransaction(transaction, date, amount, categoryId)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/transactions/category/${categoryId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    transaction,
                    date,
                    amount,
                    category_id: categoryId
                })
            });
            expect(dispatch).toHaveBeenCalledWith(actions.addTransactionSuccess(id, transaction, date, amount, categoryId));
        });
    });
});

// Update Transaction Action

describe('updateTransactionSuccess', () => {
    it('Should return the action', () => {
        const {id, transaction, date, amount} = {
            id: 1, 
            transaction: "Movie",
            date: "2018-08-12",
            amount: 15
        };
        const categoryId = 2;
        const action = actions.updateTransactionSuccess(id, transaction, date, amount, categoryId);
        expect(action.type).toEqual(actions.UPDATE_TRANSACTION_SUCCESS);
        expect(action.transactionId).toEqual(id);
        expect(action.transName).toEqual(transaction);
        expect(action.transDate).toEqual(date);
        expect(action.transAmount).toEqual(amount);
        expect(action.categoryId).toEqual(categoryId);
    });
});

describe('updateTransactionError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.updateTransactionError(error);
        expect(action.type).toEqual(actions.UPDATE_TRANSACTION_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('updateTransaction', () => {
    it('Should dispatch updateTransactionSuccess', () => {
        const fakeTransaction = {
            id: 1,
            transaction: 'Movie',
            date: '2018-08-11',
            amount: 10
        }
        const {id,transaction, date, amount} = fakeTransaction;
        const categoryId = 2;

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true, 
                json() {
                    return
                }
            });
        });

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));
        
        return actions.updateTransaction(id, transaction, date, amount, categoryId)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    id,
                    transaction,
                    date,
                    amount
                })
            });
            expect(dispatch).toHaveBeenCalledWith(actions.updateTransactionSuccess(id, transaction, date, amount, categoryId));
        });
    });
});

// Delete Transaction Action

describe('deleteTransactionSuccess', () => {
    it('Should return the action', () => {
        const transactionId = 1;
        const categoryId = 2;
        const action = actions.deleteTransactionSuccess(transactionId, categoryId);
        expect(action.type).toEqual(actions.DELETE_TRANSACTION_SUCCESS);
        expect(action.transactionId).toEqual(transactionId);
        expect(action.categoryId).toEqual(categoryId);
    });
});

describe('deleteTransactionError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.deleteTransactionError(error);
        expect(action.type).toEqual(actions.DELETE_TRANSACTION_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('deleteTransaction', () => {
    it('Should dispatch deleteTransactionSuccess', () => {
        const transactionId = 1;
        const categoryId = 2;

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true, 
                json() {
                    return
                }
            });
        });

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));
        
        return actions.deleteTransaction(transactionId, categoryId)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/transactions/${transactionId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getState().auth.authToken}`
                }
            });
            expect(dispatch).toHaveBeenCalledWith(actions.deleteTransactionSuccess(transactionId, categoryId));
        });
    });
});