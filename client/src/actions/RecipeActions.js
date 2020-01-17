import * as action_types from './action_types';
//import axios from 'axios';

export const setSelectedRecipe = (id) => async dispatch => {

    dispatch({
        type: action_types.SET_SELECTED_RECIPE,
        data: id
    })
}