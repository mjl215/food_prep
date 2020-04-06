import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from '../components/common/LandingPage';
import Navbar from '../components/navigation/Navbar';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import UploadRecipe from '../components/recipe/uploadRecipe/UploadRecipe';
import PrivateRoute from '../components/auth/PrivateRoute';
import RecipePage from '../components/recipe/recipePage/RecipePage';
import BasketPage from '../components/basket/BasketPage';
import OrderPage from '../components/orders/OrderPage';
import RecipeDisplay from '../components/recipe/recipeGrid/RecipeDisplay';
import UserPage from '../components/user/UserPage';
import UserDetails from '../components/user/UserDetails';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import ResetPasswordEdit from '../components/auth/ResetPasswordEdit';
import UserRecipes from '../components/recipe/userRecipes/UserRecipes';

const AppRouter = (props) => {
  return (
    <Router>
      <div className="grid">
        <Navbar />
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/meals' component={RecipeDisplay}></Route>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/reset-password/:passwordToken' component={ResetPassword} />
          <PrivateRoute exact path='/reset-password' userType={['ADMIN', 'SUPLIER', 'BUYER']} component={ResetPasswordEdit} />
          <PrivateRoute exact path='/add-recipe' userType={['ADMIN', 'SUPLIER']} component={UploadRecipe} />
          <PrivateRoute exact path='/user' userType={['ADMIN', 'SUPLIER', 'BUYER']} component={UserPage} />
          <PrivateRoute exact path='/user/orders' userType={['ADMIN', 'SUPLIER', 'BUYER']} component={OrderPage} />
          <PrivateRoute exact path='/user/details' userType={['ADMIN', 'SUPLIER', 'BUYER']} component={UserDetails} />
          <PrivateRoute exact path='/user/recipes' userType={['ADMIN', 'SUPLIER']} component={UserRecipes} />
          <Route exact path='/recipe/:id' component={RecipePage} />
          <Route exact path='/basket' component={BasketPage} />
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
    //setUser: (data) => dispatch(setUser(data))
})

export default connect(undefined, mapDispatchToProps)(AppRouter);