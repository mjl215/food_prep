import * as action_types from './action_types';
import axios from 'axios';

export const addError = (error) => async dispatch => {
  try {
    error.response.data.forEach((err) => {
      dispatch({
        type: action_types.ADD_ERROR,
        data: err
      })
    })

    setTimeout(() => {
      error.response.data.forEach((err) => {
        dispatch({
          type: action_types.REMOVE_ERROR,
          data: err
        })
      })
    }, 5000)
  } catch (error) {
    
  }
}