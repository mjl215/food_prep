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

  const basketSize = () => {
    //props.auth.basket && props.auth.basket.length === 1 ? ` ${props.auth.basket.length} item` : ` ${props.auth.basket.length} items` ;
    if(!props.auth.basket){
      return "0 items"
    } else if(props.auth.basket.length === 1){
      return "1 item"
    } else {
      return `${props.auth.basket.length} items`
    }
  }
  

  const supplierLinks = (
    <ul className="navbar__list">
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/">Home</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/add-recipe">Add recipe</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/user">{props.auth.firstName} - Your Account</Link></li>
      {/* <li className="navbar__list__item"><Link className="navbar__list__link" to="/user/orders">Orders</Link></li> */}
      {props.auth.authorized && <li className="navbar__list__item navbar__list__link" onClick={onClick}>logout</li>}
    </ul>
    
  );

  const buyerLinks = (
    <ul className="navbar__list">
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/">Home</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/basket">Basket - {basketSize()}</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/user">{props.auth.firstName} - Your Accoun</Link></li>
      {/* <li className="navbar__list__item"><Link className="navbar__list__link" to="/user/orders">Orders</Link></li> */}
      {props.auth.authorized && <li className="navbar__list__item navbar__list__link" onClick={onClick}>logout</li>}
    </ul>
    
  );

  const adminLinks = (
    <ul className="navbar__list">
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/">Home</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/basket">Basket - {basketSize()}</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/add-recipe">Add recipe</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/user">{props.auth.firstName} - Your Accoun</Link></li>
      {/* <li className="navbar__list__item"><Link className="navbar__list__link" to="/user/orders">Orders</Link></li> */}
      {props.auth.authorized && <li className="navbar__list__item navbar__list__link" onClick={onClick}>logout</li>}
      
    </ul>
    
  );

  const guestLinks = (
    <ul className="navbar__list">
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/">Home</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/login">Login</Link></li>
      <li className="navbar__list__item"><Link className="navbar__list__link" to="/register">Register</Link></li>
      {props.auth.authorized && <li className="navbar__list__item navbar__list__link" onClick={onClick}>logout</li>}
    </ul> 
  )

  

  const pageLinks = (user) => {
    switch(user){
      case 'ADMIN':
        return adminLinks;
      case 'SUPLIER':
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
        <h1 className="navbar__title">Home Meal Prep</h1>
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