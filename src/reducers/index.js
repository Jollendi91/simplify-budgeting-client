import * as actions from '../actions';

const uuidv4 = require('uuid/v4');

const initialState = {
    setupStep: 1,
    user: {
        id: 1,
        username: 'fakeUser'
    },
    monthlySalary: 1800,
    bills: [{
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
            user_id: 1
        },
        {
            id: 2,
            category: 'Debts',
            amount: 200,
            user_id: 1
        },
        {
            id: 3,
            category: 'Savings',
            amount: 200,
            user_id: 1
        }
    ],
    transactions: [{
            id: 1,
            description: 'Groceries',
            date: "2018-07-22",
            amount: 70,
            category_id: 1,
            user_id: 1
        },
        {
            id: 2,
            description: 'Movie',
            date: '2018-07-21',
            amount: 10,
            category_id: 1,
            user_id: 1
        },
        {
            id: 3,
            description: 'Credit Card',
            date: '2018-07-20',
            amount: 50,
            category_id: 2,
            user_id: 1
        },
        {
            id: 4,
            description: 'Birthday Money',
            date: '2018-07-19',
            amount: 100,
            category_id: 3,
            user_id: 1
        }
    ]
};

export const simplifyReducer = (state = initialState, action) => {
    if (action.type === actions.UPDATE_SALARY) {

        return Object.assign({}, state, {
            monthlySalary: action.salary
        });

    } else if (action.type === actions.ADD_BILL) {

        return Object.assign({}, state, {
            bills: [...state.bills, {
                id: uuidv4(),
                bill: action.billName,
                amount: action.billAmount,
                user_id: action.userId
            }]
        });

    } else if (action.type === actions.UPDATE_BILL) {

        return Object.assign({}, state, {
            bills: state.bills.map(bill =>
            bill.id === action.billId ? {
                id: bill.id,
                bill: action.billName,
                amount: action.billAmount,
                user_id: bill.user_id
            } : bill)
        });

    } else if (action.type === actions.DELETE_BILL) {

        return Object.assign({}, state, {
            bills: state.bills.filter(bill => bill.id !== action.billId)
        });

    } else if (action.type === actions.ADD_CATEGORY) {
        return Object.assign({}, state, {
            categories: [...state.categories, {
                id: uuidv4(),
                category: action.categoryName,
                amount: action.categoryAmount,
                user_id: action.userId
            }]
        });

    } else if (action.type === actions.UPDATE_CATEGORY) {

      return  Object.assign({}, state, {
            categories: state.categories.map(category => category.id === action.categoryId ? {
                id: action.categoryId,
                category: action.categoryName,
                amount: action.categoryAmount,
                user_id: category.user_id
            } : category)
        })

    } else if (action.type === actions.DELETE_CATEGORY) {

        return Object.assign({}, state, {
            categories: state.categories.filter(category => category.id !== action.categoryId)
        });

    } else if (action.type === actions.ADD_TRANSACTION) {

        return Object.assign({}, state, {
            transactions: [...state.transactions, {
                id: uuidv4(),
                description: action.transName,
                date: action.transDate,
                amount: action.transAmount,
                category_id: action.categoryId
            }]
        });

    } else if (action.type === actions.UPDATE_TRANSACTION) {

        return Object.assign({}, state, {
            transactions: state.transactions.map(transaction => 
                transaction.id === action.transactionId ? {
                    id: transaction.id,
                    description: action.transName,
                    date: action.transDate,
                    amount: action.transAmount,
                    category_id: transaction.category_id
                } : transaction)
        });

    } else if (action.type === actions.DELETE_TRANSACTION) {

        return Object.assign({}, state, {
            transactions: state.transactions.filter(trans => trans.id !== action.transactionId)
        });       	

    } else if (action.type === actions.SETUP_STEP) {

        return Object.assign({}, state, {
            setupStep: action.step
        });

    }

    return state;
}