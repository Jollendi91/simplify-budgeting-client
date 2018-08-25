import * as actions from '../protected-data';
import {API_BASE_URL} from '../../config';


// Add Category Action
describe('addCategorySuccess', () => {
    it('Should return the action', () => {
        const category = {
            id: 1,
            category: 'Spending',
            amount: 400
        };
        const action = actions.addCategorySuccess(category.id, category.category, category.amount);
        expect(action.type).toEqual(actions.ADD_CATEGORY_SUCCESS);
        expect(action.categoryId).toEqual(category.id);
        expect(action.categoryName).toEqual(category.category);
        expect(action.categoryAmount).toEqual(category.amount);
    });
});

describe( 'addCategoryError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.addCategoryError(error);
        expect(action.type).toEqual(actions.ADD_CATEGORY_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe( 'addCategory', () => {
    it('Should dispatch addCategorySuccess', () => {
        const category = {
            id: 1, 
            category: 'Spending',
            amount: 400
        };

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json() {
                    return category
                }
            });
        });

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));

        return actions.addCategory(category.category, category.amount)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    category: category.category,
                    amount: category.amount
                })
            });
            expect(dispatch).toHaveBeenCalledWith(actions.addCategorySuccess(category.id, category.category, category.amount));
        });
    });
});

// Update Category Actions

describe('updateCategorySuccess', () => {
    it('Return the action', () => {
        const category = {
            id: 2, 
            category: 'Debt',
            amount: 350
        };
        const action = actions.updateCategorySuccess(category.id, category.category, category.amount);
        expect(action.type).toEqual(actions.UPDATE_CATEGORY_SUCCESS);
        expect(action.categoryId).toEqual(category.id);
        expect(action.categoryName).toEqual(category.category);
        expect(action.categoryAmount).toEqual(category.amount);
    });
});

describe('updateCategoryError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.updateCategoryError(error);
        expect(action.type).toEqual(actions.UPDATE_CATEGORY_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('updateCategory', () => {
    it('Should dispatch updateCategorySuccess', () => {
        const category = {
            id: 1,
            category: 'Spending',
            amount: 400
        };

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json() {
                    return
                }
            });
        });

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));

        return actions.updateCategory(category.id, category.category, category.amount)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/categories/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().auth.authToken}`
                },
                body: JSON.stringify({
                    id: category.id,
                    category: category.category,
                    amount: category.amount
                })
            });
            expect(dispatch).toHaveBeenCalledWith(actions.updateCategorySuccess(category.id, category.category, category.amount));
        });
    });
});


// Delete Category Actions

describe('deleteCategorySuccess', () => {
    it('Should return the action', () => {
        const categoryId = 1;
        const action = actions.deleteCategorySuccess(categoryId);
        expect(action.type).toEqual(actions.DELETE_CATEGORY_SUCCESS);
        expect(action.categoryId).toEqual(categoryId);
    });
});

describe('deleteCategoryError', () => {
    it('Should return the action', () => {
        const error = 'error';
        const action = actions.deleteCategoryError(error);
        expect(action.type).toEqual(actions.DELETE_CATEGORY_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('deleteCategory', () => {
    it('Should dispatch deleteCategorySuccess', () => {
        const categoryId = 1;

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json() {
                    return
                }
            });
        });

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            auth: {
                authToken: 1234
            }
        }));

        return actions.deleteCategory(categoryId)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getState().auth.authToken}`
                }
            });
            expect(dispatch).toHaveBeenCalledWith(actions.deleteCategorySuccess(categoryId));
        });
    });
});