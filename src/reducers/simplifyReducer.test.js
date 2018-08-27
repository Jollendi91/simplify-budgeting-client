import {simplifyReducer} from './protected-data';
import * as actions from '../actions/protected-data';

describe('simplifyReducer', () => {
    //Test Data
    const bill1 = {id: 1, bill: 'bill1', amount: 10};
    const bill2 ={id: 2, bill: 'bill2', amount: 20};

    const transaction1 = {id: 1, transaction: 'transaction1', date: '2018-08-16', amount: 10};
    const transaction2 = {id: 2, transaction: 'transaction2', date: '2018-08-16', amount: 20};
    const transaction3 = {id: 3, transaction: 'transaction3', date: '2018-08-16', amount: 30}

    const category1 = {id: 1, category: 'category1', amount: 100, transactions: []};
    const category2 = {id: 2, category: 'category2', amount: 200, transactions: []};
    const category3 = {id: 3, category: 'category2', amount: 300, transactions: []};

    const user = {
        user:{
            id: 1,
            username: 'fakeUser',
            setupStep: 1,
            monthlySalary: '2000',
            bills: [bill1, bill2],
            categories: [category1, category2]
        },
        error: null,
        loading: false
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
            error: null,
            loading: false
        });
    });

    it('Should return the current state on an unkown action', () => {
        let currentState = {};
        const state = simplifyReducer(currentState, {type: '__UNKOWN'});
        expect(state).toBe(currentState);
    });

    describe('fetchProtectedUserRequest', () => {
        it('Should set loading', () => {
            let state;
            state = simplifyReducer(state, actions.fetchProtectedUserRequest());
            expect(state).toEqual({
                user: {
                    id: null,
                    username: '',
                    setupStep: 1,
                    monthlySalary: '0',
                    bills: [],
                    categories: []
                },
                error: null,
                loading: true
            });
        });
    });

    describe('fetchProtectedUserSuccess', () => {
        it('Should set the user', () => {
            let state;
            state = simplifyReducer(state, actions.fetchProtectedUserSuccess(user));
            expect(state).toEqual({
                user: user,
                error: null,
                loading: false
            });
        });
    });

    describe('fetchProtectedUserError', () => {
        it('Should set an error', () => {
            const error = 'error';
            let state;
            state = simplifyReducer(state, actions.fetchProtectedUserError(error));
            expect(state).toEqual({
                user: {
                    id: null,
                    username: '',
                    setupStep: 1,
                    monthlySalary: '0',
                    bills: [],
                    categories: []
                },
                error: error,
                loading: false
            });
        });
    });

    describe('updateSalarySuccess', () => {
        it("Should update the user's salary", () => {
            const salary = '5000';
            let state;
            state = simplifyReducer(state, actions.updateSalarySuccess(salary));
            expect(state).toEqual({
                user: {
                    id: null,
                    username: '',
                    setupStep: 1,
                    monthlySalary: '5000',
                    bills: [],
                    categories: []
                },
                loading: false,
                error: null
            });
        });
    });

    // Bill Reducers

    describe('addBillSuccess', () => {
        it('Should add a bill', () => {
            const {id, bill, amount} = bill1;
            let state;
            state = simplifyReducer(state, actions.addBillSuccess(id, bill, amount));
            expect(state).toEqual({
                user: {
                    id: null,
                    username: '',
                    setupStep: 1,
                    monthlySalary: '0',
                    bills: [bill1],
                    categories: []
                },
                loading: false,
                error: null
            })
        });
    });

    describe('updateBillSuccess', () => {
        it('Should update a single bill by id', () => {
            const {id} = bill1;
            const newBillName = 'updatedBill1';
            const newBillAmount = 300;
            let state = {
                user: {
                    bills: [bill1, bill2]
                }
            };
            state = simplifyReducer(state, actions.updateBillSuccess(id, newBillName, newBillAmount));
            expect(state).toEqual({
                user: {
                    bills: [
                        {
                            id: id, 
                            bill: newBillName, 
                            amount: newBillAmount
                        },
                         bill2
                    ]
                }
            });
        });
    });

    describe('deleteBillSuccess', () => {
        it('Should delete a single bill by id', () => {
            const {id} = bill1;
            let state = {
                user: {
                    bills: [bill1, bill2]
                }
            };
            state = simplifyReducer(state, actions.deleteBillSuccess(id));
            expect(state).toEqual({
                user: {
                    bills: [bill2]
                }
            });
        });
    });

    // Category Reducers
    describe('addCategorySuccess', () => {
        it('Should add a category', () => {
            let state;
            state = simplifyReducer(state, actions.addCategorySuccess(category1.id, category1.category, category1.amount));
            state = simplifyReducer(state, actions.addCategorySuccess(category2.id, category2.category, category2.amount));
            expect(state).toEqual({
                user: {
                    id: null,
                    username: '',
                    setupStep: 1,
                    monthlySalary: '0',
                    bills: [],
                    categories: [category1, category2]
                },
                loading: false,
                error: null
            });
        });
    });

    describe('updateCategorySuccess', () => {
        it('Should update a category by id', () => {
            const newCategoryName = 'newCategory2';
            const newCategoryAmount = 4000;
            let state = {
                user: {
                    categories: [category1, category2]
                }
            };
            state = simplifyReducer(state, actions.updateCategorySuccess(category1.id, newCategoryName, newCategoryAmount));
            expect(state).toEqual({
                user: {
                    categories: [
                        {
                            id: category1.id,
                            category: newCategoryName,
                            amount: newCategoryAmount,
                            transactions: []
                        },
                         category2
                    ]
                }
            });
        });
    });

    describe('deleteCategorySuccess', () => {
        it('Should remove a category by id', () => {
            let state = {
                user: {
                    categories: [category1, category2]
                }
            };
            state = simplifyReducer(state, actions.deleteCategorySuccess(category1.id));
            expect(state).toEqual({
                user: {
                    categories: [category2]
                }
            });
        });
    })

    // Transaction Reducers
    describe('fetchTransactionsSuccess', () => {
        it('Should add transactions to a specific category', () => {
            let newTransactions = [transaction1, transaction2, transaction3];
            let state = {
                user: {
                    categories: [
                        {
                            ...category1,
                            transactions: [transaction2]
                        },
                        category2,
                        category3
                    ]
                }
            };

            state = simplifyReducer(state, actions.fetchTransactionsSuccess(newTransactions, category1.id));
            state = simplifyReducer(state, actions.fetchTransactionsSuccess(newTransactions, category3.id));
            expect(state).toEqual({
                user: {
                    categories: [
                        {
                            ...category1,
                            transactions: [
                                transaction2,
                                transaction1,
                                transaction3
                            ]
                        },
                        category2,
                        {
                            ...category3,
                            transactions: [
                                transaction1,
                                transaction2,
                                transaction3
                            ]
                        }
                    ]
                }
            });
        });
    });

    describe('addTransactionSuccess', () => {
        it('Should add a transaction to correct category', () => {
            let state = {
                user: {
                    categories: [
                        category1,
                        category2,
                        category3
                    ]
                }
            };
            const {id, transaction, date, amount} = transaction1;
            state = simplifyReducer(state, actions.addTransactionSuccess(id, transaction, date, amount, category1.id));
            state = simplifyReducer(state, actions.addTransactionSuccess(id, transaction, date, amount, category3.id));
            expect(state).toEqual({
                user: {
                    categories: [
                        {
                            ...category1,
                            transactions: [transaction1]
                        },
                        category2,
                        {
                            ...category3,
                            transactions: [transaction1]
                        }
                    ]
                }
            });
        });
    });

    describe('updateTransactionSuccess', () => {
        it('Should update a transaction by id', () => {
            const newTransName = 'newTransaction';
            const newTransDate = '2018-01-01';
            const newTransAmount = 500;
            let state = {
                user: {
                    categories: [
                        {
                            ...category1,
                            transactions: [transaction1]
                        },
                        {
                            ...category2,
                            transactions: [transaction2]
                        }
                    ]
                }
            };

            state = simplifyReducer(state, actions.updateTransactionSuccess(transaction1.id, newTransName, newTransDate, newTransAmount, category1.id));
            expect(state).toEqual({
                user: {
                    categories: [
                        {
                            ...category1,
                            transactions: [
                                {
                                    id: transaction1.id,
                                    transaction: newTransName,
                                    date: newTransDate,
                                    amount: newTransAmount
                                }
                            ]
                        },
                        {
                            ...category2,
                            transactions: [transaction2]
                        }
                    ]
                }
            });
        });
    });

    describe('deleteTransactionSuccess', () => {
        it('Should remove a transaction by id', () => {
            let state = {
                user: {
                    categories: [
                        {
                            ...category1,
                            transactions: [transaction1]
                        },
                        {
                            ...category2,
                            transactions: [transaction2]
                        }
                    ]
                }
            };

            state = simplifyReducer(state, actions.deleteTransactionSuccess(transaction1.id, category1.id));
            expect(state).toEqual({
                user: {
                    categories: [
                        {
                            ...category1,
                            transactions: []
                        },
                        {
                            ...category2,
                            transactions: [transaction2]
                        }
                    ]
                }
            });
        });
    });

    describe('setupStepSuccess', () => {
        it('Should update the setup step', () => {
            let state = {
                user: {
                    setupStep: 1
                }
            };

            state = simplifyReducer(state, actions.setupStepSuccess(2));
            expect(state).toEqual({
                user: {
                    setupStep: 2
                }
            });
        });
    });
});
