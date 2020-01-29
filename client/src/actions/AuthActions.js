import * as action_types from './action_types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


export const registerUser = (body, config) => async dispatch => {
  try {
    const res = await axios.post('/user/register', body, config);

    localStorage.setItem('token', JSON.stringify(res.data.token));
    //const decoded = jwtDecode(res.data.token);

    dispatch({
      type: action_types.REGISTER_SUCCESS,
      data: res.data.user
    })
  } catch (error) {
    console.log('there has been an error registering: ' + error)
  }
}

export const loginUser = (body, config) => async dispatch =>  {
  try {
    const res = await axios.post('/user/login', body, config);
    localStorage.setItem('token', JSON.stringify(res.data.token));
    //const decoded = jwtDecode(res.data.token);

    dispatch({
      type: action_types.LOGIN_SUCCESS,
      data: res.data.user
    })

  } catch (error) {
    console.log('there has been an error loging into your account ' + error)
  }
}


export const logoutUser = (config) => async dispatch => {
  console.log('in logout user')

  try {
    await axios.post('/user/logout', null, config);

    dispatch({
      type: action_types.LOGOUT_USER,
    })

  } catch (error) {
    console.log('there has been an error on logout: ' + error)
  }
}

export const setUser = () => async dispatch => {
  console.log('in set user');
  const token = JSON.parse(localStorage.getItem('token'));

  if(token){
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      
    }
  
    try {
      const res = await axios.post('/user/auth', null, config);
      //const decoded = jwtDecode(res.data.token); 
      dispatch({
        type: action_types.SET_CURRENT_USER,
        data: res.data.user
      })
    } catch (error) {
      console.log(error)
      // dispatch({
      //   type: action_types.CLEAR_USER
      // })
    }
  } 
}


