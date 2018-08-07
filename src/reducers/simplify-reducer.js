import * as actions from '../actions';

const uuidv4 = require('uuid/v4');

const initialState = {
    loggedIn: false,
    user: {
        id: null,
        username: null,
        setupStep: 1,
        monthlySalary: 0,
        bills: [
            {
                id: 1,
                bill: 'Rent',
                amount: 450,
                user_id: 1
            },
            {
                id: 2,
                bill: 'Electricity',
                amount: 80,
                user_id: 1
            },
            {
                id: 3,
                bill: 'Credit Card',
                amount: 25,
                user_id: 1
            }
        ],
        categories: [{
                id: 1,
                category: 'Spending',
                amount: 600,
                user_id: 1,
                transactions: [
                    {
                        id: 1,
                        transaction: 'Groceries',
                        date: "2018-07-22",
                        amount: 70,
                        category_id: 1,
                        user_id: 1
                    },
                    {
                        id: 2,
                        transaction: 'Movie',
                        date: '2018-07-21',
                        amount: 10,
                        category_id: 1,
                        user_id: 1
                    },
                ]
            },
            {
                id: 2,
                category: 'Debts',
                amount: 200,
                user_id: 1,
                transactions: [
                    {
                        id: 3,
                        transaction: 'Credit Card',
                        date: '2018-07-20',
                        amount: 50,
                        category_id: 2,
                        user_id: 1
                    }
                ]
            },
            {
                id: 3,
                category: 'Savings',
                amount: 200,
                user_id: 1,
                transactions: [
                    {
                        id: 4,
                        transaction: 'Birthday Money',
                        date: '2018-07-19',
                        amount: 100,
                        category_id: 3,
                        user_id: 1
                    }
                ]
            }
        ]
    }
};

export const simplifyReducer = (state = initialState, action) => {
    if (action.type === actions.UPDATE_SALARY) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                monthlySalary: action.salary
            }
        });

    } else if (action.type === actions.ADD_BILL) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                bills: [...state.user.bills, {
                    id: uuidv4(),
                    bill: action.billName,
                    amount: action.billAmount,
                    user_id: action.userId
                }]
            }
        });

    } else if (action.type === actions.UPDATE_BILL) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                bills: state.user.bills.map(bill =>
                    bill.id === action.billId ? {
                        id: bill.id,
                        bill: action.billName,
                        amount: action.billAmount,
                        user_id: bill.user_id
                    } : bill)
            }  
        });

    } else if (action.type === actions.DELETE_BILL) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                bills: state.user.bills.filter(bill => bill.id !== action.billId)
            }
        });

    } else if (action.type === actions.ADD_CATEGORY) {
        return Object.assign({}, state, {
            user: {
                ...state.user,
                categories: [...state.user.categories, {
                    id: uuidv4(),
                    category: action.categoryName,
                    amount: action.categoryAmount,
                    user_id: action.userId,
                    transactions: null
                }]
            }
        });

    } else if (action.type === actions.UPDATE_CATEGORY) {

        return  Object.assign({}, state, {
            user: {
                ...state.user,
                categories: state.user.categories.map(category => category.id === action.categoryId ? {
                    id: category.id,
                    category: action.categoryName,
                    amount: action.categoryAmount,
                    user_id: category.user_id,
                    transactions: category.transactions
                } : category)
            }
        });

    } else if (action.type === actions.DELETE_CATEGORY) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                categories: state.user.categories.filter(category => category.id !== action.categoryId)
            }
        });

    } else if (action.type === actions.ADD_TRANSACTION) {

        // Find the category that matches category ID and add a transaction
        return Object.assign({}, state, {
            user: {
                ...state.user,
                categories: state.user.categories.map(category => category.id === action.categoryId ? {
                    ...category,
                    transactions: [...category.transactions, {
                        id: uuidv4(),
                transaction: action.transName,
                date: action.transDate,
                amount: action.transAmount,
                category_id: action.categoryId
                    }]
                } : category)
            }
        });

    } else if (action.type === actions.UPDATE_TRANSACTION) {

        // Find a category that matches the category ID then map over its transactions and update transaction that matches transaction ID
        return Object.assign({}, state, {
            user: {
                ...state.user,
                categories: state.user.categories.map(category => category.id === action.categoryId ? {
                    ...category,
                    transactions: category.transactions.map(transaction => transaction.id === action.transactionId ? {
                        id: transaction.id,
                        transaction: action.transName,
                        date: action.transDate,
                        amount: action.transAmount,
                        category_id: transaction.category_id
                    } : transaction)
                 } : category)
            } 
        });

    } else if (action.type === actions.DELETE_TRANSACTION) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                categories: state.user.categories.map(category => category.id === action.categoryId ? {
                    ...category,
                    transactions: category.transactions.filter(trans => trans.id !== action.transactionId)
                 } : category)
            } 
        });       	

    } else if (action.type === actions.SETUP_STEP) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                setupStep: action.step
            }
        });

    }

    return state;
}