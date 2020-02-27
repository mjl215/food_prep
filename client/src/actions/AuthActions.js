import * as action_types from './action_types';
import axios from 'axios';

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
  }
}

export const loginUser = (body, config) => async dispatch =>  {
  try {
    const res = await axios.post('/user/login', body, config);
    console.log(res.status);
    localStorage.setItem('token', JSON.stringify(res.data.token));
    

    dispatch({
      type: action_types.LOGIN_SUCCESS,
      data: res.data.user
    })

  } catch (error) {
    dispatch({
      type: action_types.ADD_ERROR,
      data: error.response.data
    })

    setTimeout(() => {
      dispatch({
        type: action_types.REMOVE_ERROR,
        data: error.response.data
      })
    }, 5000)
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
  
  
  
  
    try {
      const token = JSON.parse(localStorage.getItem('token'));

  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        
      }
      const res = await axios.post('/user/auth', null, config);

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


