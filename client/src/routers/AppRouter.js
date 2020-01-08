import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import LandingPage from '../components/common/LandingPage';

import Register from '../components/auth/Register'
import PrivateRoute from '../components/common/PrivateRoute';


const AppRouter = (props) => {

//   useEffect(() => {

//       const token = JSON.parse(localStorage.getItem('token'));
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       }

//       props.setUser(config);
//   }, [props])

  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          {/* <PrivateRoute exact path='/post' component={PostDashboard} /> */}
          <Route exact path='/register' component={Register} />
          {/* <Route exact path='/forecast/:location' component={DetailedForecast} /> */}
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
//   setUser: (data) => dispatch(setUser(data))
})

export default connect(undefined, mapDispatchToProps)(AppRouter);