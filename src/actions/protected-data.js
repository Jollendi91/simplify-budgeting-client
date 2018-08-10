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


export const UPDATE_SALARY = 'UPDATE_SALARY';
export const updateSalary = salary => ({
    type: UPDATE_SALARY,
    salary
});

export const SETUP_USER_SALARY_ERROR = 'SETUP_USER_SALARY_ERROR';
export const setupUserSalaryError = error => ({
    type: SETUP_USER_SALARY_ERROR,
    error
});

export const setupUserSalary = salary => (dispatch, getState) => {
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
        dispatch(updateSalary(salary));
    })
    .catch(err => {
        dispatch(setupUserSalaryError(err));
    });
}

export const ADD_BILL = 'ADD_BILL';
export const addBill = (billName, billAmount, userId) => ({
    type: ADD_BILL,
    billName,
    billAmount,
    userId
});

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

export const SETUP_STEP = 'SETUP_STEP';
export const setupStep = (step) => ({
    type: SETUP_STEP,
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
    .then(() => dispatch(setupStep(step)))
    .catch(err => dispatch(setupStepError(err)));
}