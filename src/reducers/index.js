import * as actions from '../actions';

const initialState= {
    user: {
        id: 1,
        username: 'fakeUser'
    },
    monthlySalary: 1800,
    bills: [
        {
            bill: 'Rent',
            amount: 450,
            user_id: 1
        },
        {
            bill: 'Electricity',
            amount: 80,
            user_id: 1
        },
        {
            bill: 'Credit Card',
            amount: 25,
            user_id: 1
        }
    ],
    categories: [
        {
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
    transactions: [
        {
            description: 'Groceries',
            date: "07/22/2018",
            amount: 70,
            category_id: 1,
            user_id: 1
        },
        {
            description: 'Movie',
            date: '07/21/2018',
            amount: 10,
            category_id: 1,
            user_id: 1
        },
        {
            description: 'Credit Card',
            date: '07/20/2018',
            amount: 50,
            category_id: 2,
            user_id: 1
        },
        {
            description: 'Birthday Money',
            date: '07/19/2018',
            amount: 100,
            category_id: 3,
            user_id: 1
        }
    ]
};

export const simplifyReducer = (state=initialState, action) => {
    if (action.type === actions.UPDATE_SALARY) {
        return Object.assign({}, state, {
            monthlySalary: action.salary
        });
    } else if (action.type === actions.ADD_BILL) {
        return Object.assign({}, state, {
            bills: [...state.bills, {
                bill: action.billName,
                amount: action.billAmount,
                user_id: action.userId
            }]
        });
    } else if (action.type === actions.ADD_CATEGORY) {
        return Object.assign({}, state, {
            categories: [...state.categories, {
                category: action.categoryName,
                amount: action.categoryAmount,
                user_id: action.userId
            }]
        });
    } else if (action.type === actions.ADD_TRANSACTION) {
        return Object.assign({}, state, {
            transactions: [...state.transactions, {
                description: action.transName,
                date: action.transDate,
                amount: action.transAmount,
                category_id: action.categoryId
            }]
        });
    }

    return state;
}