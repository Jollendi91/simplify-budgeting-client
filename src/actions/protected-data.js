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

   return fetch(`${API_BASE_URL}/dashboard`, {
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

  return  fetch(`${API_BASE_URL}/bills`, {
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

export const UPDATE_BILL_SUCCESS = 'UPDATE_BILL_SUCCESS';
export const updateBillSuccess = ( billId, billName, billAmount) => ({
    type: UPDATE_BILL_SUCCESS,
    billId,
    billName,
    billAmount
});

export const UPDATE_BILL_ERROR = 'UPDATE_BILL_ERROR';
export const updateBillError = error => ({
    type: UPDATE_BILL_ERROR,
    error
});

export const updateBill = (id, bill, amount) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

   return fetch(`${API_BASE_URL}/bills/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            id,
            bill,
            amount
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(updateBillSuccess(id, bill, amount)))
    .catch(err => dispatch(updateBillError(err)));
}

export const DELETE_BILL_SUCCESS = 'DELETE_BILL_SUCCESS';
export const deleteBillSuccess = (billId) => ({
    type: DELETE_BILL_SUCCESS,
    billId
});

export const DELETE_BILL_ERROR = 'DELETE_BILL_ERROR';
export const deleteBillError = error => ({
    type: DELETE_BILL_ERROR,
    error
});

export const deleteBill = billId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/bills/${billId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(deleteBillSuccess(billId)))
    .catch(err => dispatch(deleteBillError(err)));
}

export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const addCategorySuccess = (categoryId, categoryName, categoryAmount) => ({
    type: ADD_CATEGORY_SUCCESS,
    categoryId, 
    categoryName,
    categoryAmount
});

export const ADD_CATEGORY_ERROR = 'ADD_CATEGORY_ERROR';
export const addCategoryError = error => ({
    type: ADD_CATEGORY_ERROR,
    error
});

export const addCategory = (category, amount) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            category,
            amount
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
        const {id, category, amount} = res;
        return dispatch(addCategorySuccess(id, category, parseFloat(amount)));
    })
    .catch(err => dispatch(addCategoryError(err)))
}

export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const updateCategorySuccess = (categoryId, categoryName, categoryAmount) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    categoryId,
    categoryName,
    categoryAmount,
});

export const UPDATE_CATEGORY_ERROR = 'UPDATE_CATEGORY_ERROR';
export const updateCategoryError = error => ({
    type: UPDATE_CATEGORY_ERROR,
    error
});

export const updateCategory = (categoryId, category, amount) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            id: categoryId,
            category,
            amount,
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(updateCategorySuccess(categoryId, category, amount)))
    .catch(err => dispatch(updateCategoryError(err)));
}

export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const deleteCategorySuccess = categoryId => ({
    type: DELETE_CATEGORY_SUCCESS,
    categoryId
});

export const DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR';
export const deleteCategoryError = error => ({
    type: DELETE_CATEGORY_ERROR,
    error
});

export const deleteCategory = categoryId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(deleteCategorySuccess(categoryId)))
    .catch(err => dispatch(deleteCategoryError(err)));
}

export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';
export const addTransactionSuccess = (transId, transName, transDate, transAmount, categoryId) => ({
    type: ADD_TRANSACTION_SUCCESS,
    transId,
    transName, 
    transDate,
    transAmount,
    categoryId
});

export const ADD_TRANSACTION_ERROR = 'ADD_TRANSACTION_ERROR';
export const addTransactionError = error => ({
    type: ADD_TRANSACTION_ERROR,
    error
});

export const addTransaction = (transaction, date, amount, categoryId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/transactions/category/${categoryId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            transaction,
            date,
            amount,
            category_id: categoryId 
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
        const {id, transaction, date, amount} = res;
      return  dispatch(addTransactionSuccess(id, transaction, date, amount, categoryId));
    })
    .catch(err => dispatch(addTransactionError(err)));
}

export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
export const updateTransactionSuccess = (transactionId, transName, transDate, transAmount, categoryId) => ({
    type: UPDATE_TRANSACTION_SUCCESS,
    transactionId,
    transName,
    transDate, 
    transAmount,
    categoryId
});

export const UPDATE_TRANSACTION_ERROR = 'UPDATE_TRANSACTION_ERROR';
export const updateTransactionError = error => ({
    type: UPDATE_TRANSACTION_ERROR,
    error
});

export const updateTransaction = (id, transaction, date, amount, categoryId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            id, 
            transaction,
            date,
            amount
        })
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(updateTransactionSuccess(id, transaction, date, amount, categoryId)))
    .catch(err => dispatch(updateTransactionError(err))); 
}

export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
export const deleteTransactionSuccess = (transactionId, categoryId) => ({
    type: DELETE_TRANSACTION_SUCCESS,
    transactionId,
    categoryId
});

export const DELETE_TRANSACTION_ERROR = 'DELETE_TRANSACTION_ERROR';
export const deleteTransactionError = error => ({
    type: DELETE_TRANSACTION_ERROR,
    error
});

export const deleteTransaction = (transactionId, categoryId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(deleteTransactionSuccess(transactionId, categoryId)))
    .catch(err => dispatch(deleteTransactionError(err)));
}

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
    
    return fetch(`${API_BASE_URL}/dashboard`, {
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