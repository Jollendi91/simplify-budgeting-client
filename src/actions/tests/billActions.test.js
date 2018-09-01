import * as actions from '../protected-data';
import {API_BASE_URL} from '../../config';


// Add Bill Action
describe('addBillSuccess', () => {
    it('Should return the action', () => {
        const id = 1;
        const bill = 'rent';
        const amount = 200;
        const action = actions.addBillSuccess(id, bill, amount);

        expect(action.type).toEqual(actions.ADD_BILL_SUCCESS);
        expect(action.billId).toEqual(id);
        expect(action.billName).toEqual(bill);
        expect(action.billAmount).toEqual(amount);
    });
});

describe('addBillError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.addBillError(error);
        expect(action.type).toEqual(actions.ADD_BILL_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('addBill', () => {
    it('Should dispatch addBillSuccess', () => {
        const bill = {
            id: 1,
            bill: 'rent',
            amount: 200
        };

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json() {
                return bill;
            }
        }));

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));

        return actions.addBill(bill.bill, bill.amount)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/bills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    bill: bill.bill,
                    amount: bill.amount
                })
            });
            expect(dispatch).toHaveBeenCalledWith(actions.addBillSuccess(bill.id, bill.bill, bill.amount));
        });
    });
});

// Update Bill Action 
describe('updateBillSuccess', () => {
    it('Should return the action', () => {
        const bill = {
            id: 1,
            bill: 'rent',
            amount: 200
        };
        const action = actions.updateBillSuccess(bill.id, bill.bill, bill.amount);
        expect(action.type).toEqual(actions.UPDATE_BILL_SUCCESS);
        expect(action.billId).toEqual(bill.id);
        expect(action.billName).toEqual(bill.bill);
        expect(action.billAmount).toEqual(bill.amount);
    });
});

describe('updateBillError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.updateBillError(error);
        expect(action.type).toEqual(actions.UPDATE_BILL_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('updateBill', () => {
    it('Sould dispatch updateBillSuccess', () => {
        const bill = {
            id: 1,
            bill: 'rent',
            amount: 200
        };

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json() {
                return bill;
            }
        }));

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));

        return actions.updateBill(bill.id, bill.bill, bill.amount)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/bills/${bill.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    id: bill.id,
                    bill: bill.bill,
                    amount: bill.amount
                })
            });
            expect(dispatch).toHaveBeenCalledWith(actions.updateBillSuccess(bill.id, bill.bill, bill.amount));
        });
    });
});


// Delete Bill Action
describe('deleteBillSuccess', () => {
    it('Should return the action', () => {
        const billId = 1;
        const action = actions.deleteBillSuccess(billId);
        expect(action.type).toEqual(actions.DELETE_BILL_SUCCESS);
        expect(action.billId).toEqual(billId);
    });
});

describe('deleteBillError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.deleteBillError(error);
        expect(action.type).toEqual(actions.DELETE_BILL_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('deleteBill', () => {
    it('Should dispatch deleteBillSuccess', () => {
        const billId = 1;

        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            ok: true,
            json() {
                return
            }
        }));

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));

        return actions.deleteBill(billId)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/bills/${billId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getState().auth.authToken}`
                }
            });
            expect(dispatch).toHaveBeenCalledWith(actions.deleteBillSuccess(billId));
        });
    });
});