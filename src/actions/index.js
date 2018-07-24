export const UPDATE_SALARY = 'UPDATE_SALARY';
export const updateSalary = salary => ({
    type: UPDATE_SALARY,
    salary
});

export const ADD_BILL = 'ADD_BILL';
export const addBill = (billName, billAmount, userId) => ({
    type: ADD_BILL,
    billName,
    billAmount,
    userId
});

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const addCategory = (categoryName, categoryAmount, userId) => ({
    type: ADD_CATEGORY,
    categoryName,
    categoryAmount,
    userId
});