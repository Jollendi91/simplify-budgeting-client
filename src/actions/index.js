export const UPDATE_SALARY = 'UPDATE_SALARY';
export const updateSalary = salary => ({
    type: UPDATE_SALARY,
    salary
});

export const ADD_BILL = 'ADD_BILL';
export const addBill = (billName, billAmount) => ({
    type: ADD_BILL,
    billName,
    billAmount
});