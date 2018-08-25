import * as actions from '../protected-data';
import {API_BASE_URL} from '../../config';

// Update User Salary Action 

describe('updateSalarySuccess', () => {
    it('Should return the action', () => {
        const salary = 100;
        const action = actions.updateSalarySuccess(salary);
        expect(action.type).toEqual(actions.UPDATE_SALARY_SUCCESS);
        expect(action.salary).toEqual(salary);
    });
});

describe('updateSalaryError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.updateSalaryError(error);
        expect(action.type).toEqual(actions.UPDATE_SALARY_ERROR);
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

        return actions.updateSalary(salary)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/dashboard`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    monthlySalary: salary
                })});
            expect(dispatch).toHaveBeenCalledWith(actions.updateSalarySuccess(salary));
        });
    });
});

// Update Setup Step Action

describe('setupStepSuccess', () => {
    it('Should return the action', () => {
        const step = 2;
        const action = actions.setupStepSuccess(step);
        expect(action.type).toEqual(actions.SETUP_STEP_SUCCESS);
        expect(action.step).toEqual(step);
    });
});

describe('setupStepError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.setupStepError(error);
        expect(action.type).toEqual(actions.SETUP_STEP_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('updateStep', () => {
    it('Should dispatch setupStepSuccess', () => {
        const step = 2;

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

        return actions.updateStep(step)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/dashboard`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    setupStep: step
                })});
            expect(dispatch).toHaveBeenCalledWith(actions.setupStepSuccess(step));
        });
    });
});