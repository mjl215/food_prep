import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



import LandingPage from '../components/common/LandingPage';
import Navbar from '../components/navigation/Navbar';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import UploadRecipe from '../components/recipe/UploadRecipe';
import PrivateRoute from '../components/auth/PrivateRoute';
import RecipePage from '../components/recipe/recipePage/RecipePage';

const AppRouter = (props) => {

  

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          {/* <PrivateRoute exact path='/post' component={PostDashboard} /> */}
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/add-recipe' userType={['ADMIN', 'SUPPLIER']} component={UploadRecipe} />
          <Route exact path='/recipe/:id' component={RecipePage} />
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
    //setUser: (data) => dispatch(setUser(data))
})

export default connect(undefined, mapDispatchToProps)(AppRouter);