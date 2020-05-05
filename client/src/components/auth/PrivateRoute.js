import React, { useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setUser } from '../../actions/AuthActions';

const PrivateRoute =  ({ component: Component, auth, userType, setUser, ...rest }) => {
   
    if(userType){
      const correctUserType = userType.includes(auth.userType);
      return (
        <Route
          {...rest}
          render={props => !auth.authorized || !correctUserType ? (
              <Redirect to="/" />
            ) : (
              <Component {...props} />
              )
          }
        />
      )
    } else {
      
      return (
        <Route
          {...rest}
          render={props => !auth.authorized ? (
              <Redirect to="/" />
            ) : (
              <Component {...props} />
              )
          }
          
        />
      )
    }
}
    
const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch(setUser(data))
})



export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);