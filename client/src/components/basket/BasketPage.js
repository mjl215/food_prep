import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import BasketItem from './BasketItem';

class BasketPage extends Component {
  constructor(props){
    super(props)  
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

    const res = await axios.post('user/basket/checkout', null, config)

    console.log(res);
  }


  render() {

    const basketItems = this.props.auth.basket && this.props.auth.basket.map((item) => {
      return <BasketItem key={item._id} item={item}/>
    })
    console.log(this.props.auth)

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

})


export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);