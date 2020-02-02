import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import BasketItem from './BasketItem';
import { setUser } from '../../actions/AuthActions';

class BasketPage extends Component {
  constructor(props){
    super(props)  

    this.state = {
      errors: undefined
    }

    this.onCheckout = this.onCheckout.bind(this);
  }

  componentDidMount(){
    
  }

  async onCheckout(){
    
    const token = JSON.parse(localStorage.getItem('token'));
      
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    const body = {
      basket: this.props.auth.basket
    }

    await axios.post('user/basket/checkout', body, config)

    this.props.setUser();
    
  }


  render() {

    const basketItems = this.props.auth.basket && this.props.auth.basket.map((item) => {
      return <BasketItem key={item._id} item={item}/>
    })

    return (
      <div>
        <p>Basket page</p>
        {basketItems ? basketItems : <p>no items in basket</p>}
        <button onClick={this.onCheckout}>Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  setUser: () => dispatch(setUser())
})


export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);