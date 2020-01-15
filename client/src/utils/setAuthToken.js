import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    console.log(token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    console.log(axios.defaults.headers);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
