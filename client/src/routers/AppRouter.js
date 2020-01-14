import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { setUser } from '../actions/AuthActions'

import LandingPage from '../components/common/LandingPage';
import Navbar from '../components/navigation/Navbar';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import UploadRecipe from '../components/recipe/UploadRecipe';
import PrivateRoute from '../components/common/PrivateRoute';


const AppRouter = (props) => {

  useEffect(() => {
    console.log('in use effect')
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      props.setUser(config);
  }, [props])

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          {/* <PrivateRoute exact path='/post' component={PostDashboard} /> */}
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/add-recipe' component={UploadRecipe} />
          {/* <Route exact path='/forecast/:location' component={DetailedForecast} /> */}
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (data) => dispatch(setUser(data))
})

export default connect(undefined, mapDispatchToProps)(AppRouter);