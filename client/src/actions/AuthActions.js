import * as action_types from './action_types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


export const registerUser = (body, config) => async dispatch => {
  try {
    const res = await axios.post('/user', body, config);

    localStorage.setItem('token', JSON.stringify(res.data.token));
    const decoded = jwtDecode(res.data.token);

    console.log(res);
    console.log(decoded);
    dispatch({
      type: action_types.REGISTER_SUCCESS,
      data: decoded
    })
  } catch (error) {
    console.log('there has been an error registering: ' + error)
  }
}