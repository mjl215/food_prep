import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserPage extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>User details</h1>
        </div>
        <Link className="navbar__list__link" to="/user/orders">
          <div>
            <h1>Orders</h1>
          </div>
        </Link>
        <div>
          <h1>Your Recipes</h1>
        </div>
      </div>
    )
  }
}

export default UserPage;