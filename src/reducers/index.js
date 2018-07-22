
const initialState= {
    user: {
        id: 1,
        username: 'fakeUser'
    },
    monthlySalary: 1800,
    page: 'signup',
    bills: [
        {
            name: 'Rent',
            amount: 450
        },
        {
            name: 'Electricity',
            amount: 80
        },
        {
            name: 'Credit Card',
            amount: 25
        }
    ],
    categories: [
        {
            id: 1,
            name: 'Spending',
            amount: 600
        },
        {
            id: 2,
            name: 'Debts',
            amount: 200
        },
        {
            id: 3,
            name: 'Savings',
            amount: 200
        }
    ],
    transactions: [
        {
            name: 'Groceries',
            date: "07/22/2018",
            amount: 70,
            category_id: 1
        },
        {
            name: 'Movie',
            date: '07/21/2018',
            amount: 10,
            category_id: 1
        },
        {
            name: 'Credit Card',
            date: '07/20/2018',
            amount: 50,
            category_id: 2
        },
        {
            name: 'Birthday Money',
            date: '07/19/2018',
            amount: 100,
            category_id: 3
        }
    ]
};

export const simplifyReducer = (state=initialState, action) => {
    return state;
}