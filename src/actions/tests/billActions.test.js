import * as actions from '../protected-data';
import {API_BASE_URL} from '../../config';

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