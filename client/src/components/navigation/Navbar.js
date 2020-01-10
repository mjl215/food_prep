import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/AuthActions';

const Navbar = (props) => {

  const onClick = async () => {
    
    try {

      const token = JSON.parse(localStorage.getItem('token'));
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      
      props.logoutUser(config)

    } catch (error) {
      console.log(error)
    }

  }
  

  const supplierLinks = (
    <ul className="navbar__list">
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/">Home</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/post">Posts</Link></li>
      <li className="navbar__list__item navbar__list__link" onClick={onClick}>logout</li>
    </ul>
    
  );

  const buyerLinks = (
    <ul className="navbar__list">
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/">Home</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/post">Posts</Link></li>
      <li className="navbar__list__item navbar__list__link" onClick={onClick}>logout</li>
    </ul>
    
  );

  const adminLinks = (
    <ul className="navbar__list">
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/">Home</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/post">Posts</Link></li>
      <li className="navbar__list__item navbar__list__link" onClick={onClick}>logout</li>
    </ul>
    
  );

  const guestLinks = (
    <ul className="navbar__list">
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/">Home</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/login">Login</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/register">Register</Link></li>
      <li className="navbar__list__item navbar__list__link" onClick={onClick}>logout</li>
    </ul> 
  )

  

  const pageLinks = (user) => {
    switch(user){
      case 'ADMIN':
        return adminLinks;
      case 'SUPPLIER':
        return supplierLinks;
      case 'BUYER':
        return buyerLinks;
      default:
        return guestLinks;
    }
  }

  return (
    <div className="navbar">
      <div className="navbar__title__container">
        <h1 className="navbar__title">Home Meal Prep and Private Cooking</h1>
      </div>
      {pageLinks(props.auth.userType)}
    </div>
  )
}


const mapStateToProps =(state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (header) => dispatch(logoutUser(header))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);