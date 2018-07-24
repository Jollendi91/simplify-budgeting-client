import * as actions from '../actions';

const initialState= {
    user: {
        id: 1,
        username: 'fakeUser'
    },
    monthlySalary: 1800,
    bills: [
        {
            name: 'Rent',
            amount: 450,
            user_id: 1
        },
        {
            name: 'Electricity',
            amount: 80,
            user_id: 1
        },
        {
            name: 'Credit Card',
            amount: 25,
            user_id: 1
        }
    ],
    categories: [
        {
            id: 1,
            name: 'Spending',
            amount: 600,
            user_id: 1
        },
        {
            id: 2,
            name: 'Debts',
            amount: 200,
            user_id: 1
        },
        {
            id: 3,
            name: 'Savings',
            amount: 200,
            user_id: 1
        }
    ],
    transactions: [
        {
            name: 'Groceries',
            date: "07/22/2018",
            amount: 70,
            category_id: 1,
            user_id: 1
        },
        {
            name: 'Movie',
            date: '07/21/2018',
            amount: 10,
            category_id: 1,
            user_id: 1
        },
        {
            name: 'Credit Card',
            date: '07/20/2018',
            amount: 50,
            category_id: 2,
            user_id: 1
        },
        {
            name: 'Birthday Money',
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
                name: action.billName,
                amount: action.billAmount,
                user_id: action.userId
            }]
        });
    } else if (action.type === actions.ADD_CATEGORY) {
        return Object.assign({}, state, {
            categories: [...state.categories, {
                name: action.categoryName,
                amount: action.categoryAmount,
                user_id: action.userId
            }]
        });
    }

    return state;
}