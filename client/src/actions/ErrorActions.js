import * as action_types from './action_types';
import axios from 'axios';

export const addError = (error) => async dispatch => {
  try {
    console.log(error.response)
  } catch (error) {
    
  }
}