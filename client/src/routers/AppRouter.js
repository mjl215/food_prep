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
import BasketPage from '../components/basket/BasketPage';
import OrderPage from '../components/orders/OrderPage';

const AppRouter = (props) => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/add-recipe' userType={['ADMIN', 'SUPLIER']} component={UploadRecipe} />
          <PrivateRoute exact path='/user/orders' userType={['ADMIN', 'SUPLIER', 'BUYER']} component={OrderPage} />
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