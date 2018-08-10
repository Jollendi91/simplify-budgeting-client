import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_USER_SUCCESS = 'FETCH_PROTECTED_USER_SUCCESS';
export const fetchProtectedUserSuccess = user => ({
    type: FETCH_PROTECTED_USER_SUCCESS,
    user
});

export const FETCH_PROTECTED_USER_ERROR = 'FETCH_PROTECTED_USER_ERROR';
export const fetchProtectedUserError = error => ({
    type: FETCH_PROTECTED_USER_ERROR,
    error
});

export const fetchProtectedUser = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/dashboard`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(fetchProtectedUserSuccess(res)))
    .catch(err => {
        dispatch(fetchProtectedUserError(err));
    });
};


export const UPDATE_SALARY_SUCCESS = 'UPDATE_SALARY_SUCCESS';
export const updateSalarySuccess = salary => ({
    type: UPDATE_SALARY_SUCCESS,
    salary
});

export const UPDATE_SALARY_ERROR = 'UPDATE_SALARY_ERROR';
export const updateSalaryError = error => ({
    type: UPDATE_SALARY_ERROR,
    error
});

export const updateSalary = salary => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    fetch(`${API_BASE_URL}/dashboard`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            monthlySalary: salary
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(updateSalarySuccess(salary));
    })
    .catch(err => {
        dispatch(updateSalaryError(err));
    });
}

export const ADD_BILL_SUCCESS = 'ADD_BILL_SUCCESS';
export const addBillSuccess = (billId, billName, billAmount) => ({
    type: ADD_BILL_SUCCESS,
    billId,
    billName,
    billAmount
});

export const ADD_BILL_ERROR = 'ADD_BILL_ERROR';
export const addBillError = error => ({
    type: ADD_BILL_ERROR,
    error
});

export const addBill = (bill, amount) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    fetch(`${API_BASE_URL}/bills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            bill,
            amount
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
       const {id, bill, amount} = res;  
      return dispatch(addBillSuccess(id, bill, parseFloat(amount)));
    })
    .catch(err => dispatch(addBillError(err)));
}

export const UPDATE_BILL = 'UPDATE_BILL';
export const updateBill = (billName, billAmount, billId) => ({
    type: UPDATE_BILL,
    billName,
    billAmount,
    billId
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
export const addTransaction = (transName, transDate, transAmount, categoryId) => ({
    type: ADD_TRANSACTION,
    transName, 
    transDate,
    transAmount,
    categoryId
});

export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const updateTransaction = (transName, transDate, transAmount, transactionId, categoryId) => ({
    type: UPDATE_TRANSACTION,
    transName,
    transDate, 
    transAmount,
    transactionId,
    categoryId
});

export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const deleteTransaction = (transactionId, categoryId) => ({
    type: DELETE_TRANSACTION,
    transactionId,
    categoryId
});

export const SETUP_STEP_SUCCESS = 'SETUP_STEP_SUCCESS';
export const setupStepSuccess = (step) => ({
    type: SETUP_STEP_SUCCESS,
    step
});

export const SETUP_STEP_ERROR = 'SETUP_STEP_ERROR';
export const setupStepError = error => ({
    type: SETUP_STEP_ERROR,
    error
});

export const updateStep = (step) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    
    fetch(`${API_BASE_URL}/dashboard`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            setupStep: step
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(setupStepSuccess(step)))
    .catch(err => dispatch(setupStepError(err)));
}