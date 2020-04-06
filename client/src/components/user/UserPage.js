import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserPage extends Component {
  render() {
    return (
      <div>
        <Link className="navbar__list__link" to="/user/details">
          <div>
            <h1>User details</h1>
          </div>
        </Link>
        <Link className="navbar__list__link" to="/user/orders">
          <div>
            <h1>Orders</h1>
          </div>
        </Link>
        <Link className="navbar__list__link" to="/user/recipes">
          <div>
            <h1>Your Recipes</h1>
          </div>
        </Link>
        
      </div>
    )
  }
}

export default UserPage;