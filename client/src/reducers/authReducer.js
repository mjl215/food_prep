const authReducerDefaultState = {
    id: '',
    authorized: false,
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    userType: '',
    active: null,
    profileImage: null,
    location: null,
    basket: []
  };
  
  const authReducer = (state = authReducerDefaultState, action) => {
    switch (action.type) {
      // case 'SET_CURRENT_USER':
      //   return {
      //     token: localStorage.getItem('token'),
      //     isAuthenticated: !isEmpty(action.data),
      //     loading: false,
      //     user: action.data
      //   };
  
      // case 'CLEAR_USER': 
      //   return {
      //     token: null,
      //     isAuthenticated: false,
      //     loading: false,
      //     user: false
      //   }
      
  
      case 'REGISTER_SUCCESS':
      case 'LOGIN_SUCCESS':
      case 'SET_CURRENT_USER':
        return {
          id: action.data._id,
          authorized: true,
          firstName:  action.data.firstName,
          lastName: action.data.lastName,
          email: action.data.email,
          bio:  action.data.bio,
          active: action.data.active,
          userType: action.data.userType,
          profileImage: action.data.profileImage,
          location: action.data.location,
          basket: action.data.basket
        };
  
    //   case 'REGISTER_FAIL':
    //     localStorage.removeItem('token')
    //     return {
    //       ...state,
    //       token: null,
    //       isAuthenticated: false,
    //       loading: false
    //     };
      
      case 'LOGOUT_USER':
      case 'CLEAR_USER':
        localStorage.removeItem('token')
        return{
          authorized: false,
          firstName: '',
          lastName: '',
          email: '',
          bio:  '',
          active: '',
          userType: null,
          profileImage: null,
          userType: '',
          location: null
        };
      
      default:
        return state
    }
  }
  
  export default authReducer