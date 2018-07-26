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

export const DELETE_BILL = 'DELETE_BILL';
export const deleteBill = (billId) => ({
    type: DELETE_BILL,
    billId
});

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const addCategory = (categoryName, categoryAmount, userId) => ({
    type: ADD_CATEGORY,
    categoryName,
    categoryAmount,
    userId
});

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const updateCategory = (categoryName, categoryAmount, categoryId) => ({
    type: UPDATE_CATEGORY,
    categoryName,
    categoryAmount,
    categoryId
});

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const deleteCategory = (categoryId) => ({
    type: DELETE_CATEGORY,
    categoryId
});

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const addTransaction = (transName, transDate, transAmount, categoryId, userId) => ({
    type: ADD_TRANSACTION,
    transName, 
    transDate,
    transAmount,
    categoryId
});

export const SETUP_STEP = 'SETUP_STEP';
export const setupStep = (step) => ({
    type: SETUP_STEP,
    step
});