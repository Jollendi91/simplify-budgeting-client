import * as actions from '../actions/protected-data';

const uuidv4 = require('uuid/v4');

const initialState = {
    user: '',
    error: null
};

export const simplifyReducer = (state = initialState, action) => {
    if (action.type === actions.FETCH_PROTECTED_USER_SUCCESS) {

        return Object.assign({}, state, {
            user: action.user,
            error: null
        });

    } else if (action.type === actions.FETCH_PROTECTED_USER_ERROR) {

        return Object.assign({}, state, {
            error: action.error
        });

    } else if (action.type === actions.UPDATE_SALARY_SUCCESS) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                monthlySalary: action.salary
            }
        });

    } else if (action.type === actions.UPDATE_SALARY_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === actions.ADD_BILL_SUCCESS) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                bills: [...state.user.bills, {
                    id: action.billId,
                    bill: action.billName,
                    amount: action.billAmount
                }]
            }
        });

    } else if (action.type === actions.ADD_BILL_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });

    } else if (action.type === actions.UPDATE_BILL_SUCCESS) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                bills: state.user.bills.map(bill =>
                    bill.id === action.billId ? {
                        id: bill.id,
                        bill: action.billName,
                        amount: action.billAmount
                    } : bill)
            }  
        });

    } else if (action.type === actions.UPDATE_BILL_ERROR) {
        return Object.assign({}, state, {
            error: action.error
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

    } else if (action.type === actions.SETUP_STEP_SUCCESS) {

        return Object.assign({}, state, {
            user: {
                ...state.user,
                setupStep: action.step
            }
        });
    } else if (action.type === actions.SETUP_STEP_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }

    return state;
}