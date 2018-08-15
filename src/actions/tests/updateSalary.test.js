import {
    updateSalary,
    UPDATE_SALARY_SUCCESS,
    updateSalarySuccess,
    UPDATE_SALARY_ERROR,
    updateSalaryError
} from '../protected-data';
import {API_BASE_URL} from '../../config';

describe('updateSalarySuccess', () => {
    it('Should return the action', () => {
        const salary = 100;
        const action = updateSalarySuccess(salary);
        expect(action.type).toEqual(UPDATE_SALARY_SUCCESS);
        expect(action.salary).toEqual(salary);
    });
});

describe('updateSalaryError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = updateSalaryError(error);
        expect(action.type).toEqual(UPDATE_SALARY_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('updateSalary', () => {
    it('Should dispatch updateSalarySuccess', () => {
        const salary = 100;

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

        return updateSalary(salary)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/dashboard`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    monthlySalary: salary
                })});
            expect(dispatch).toHaveBeenCalledWith(updateSalarySuccess(salary));
        });
    });
});