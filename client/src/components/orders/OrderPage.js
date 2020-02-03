import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import OrderItem from './OrderItem';

class OrderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: null
    }
}

async componentDidMount(){

  const token = JSON.parse(localStorage.getItem('token'));
      
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  const orderRes = await axios.get('/user/orders', config);

  this.setState({orders: orderRes.data.orders})
}


  render() {

    const orderDisplay = this.state.orders ? this.state.orders.map((order) => <OrderItem key={order._id} order={order} />) : <h1>No orders</h1>

    return (
      <div>
        <h1>Your Orders</h1>
        {orderDisplay}
      </div>
    )
  }
}

  
const mapStateToProps = state => ({
  auth: state.auth
})  

export default connect(mapStateToProps)(OrderPage);