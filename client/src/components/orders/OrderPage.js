import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import JointOrder from './JointOrder';

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

    // const orderDisplay = this.state.orders ? this.state.orders.map((order) => <OrderItem key={order._id} order={order} />) : <h1>No orders</h1>
    
    const jointOrders = this.state.orders && Object.values(this.state.orders.reduce((result, {_id, recipe, quantity, buyer, suplier, orderId, status, prepTime}) => {
      if(!result[orderId]){
        result[orderId] = {
          orderId,
          orders: []
        }
      };

      result[orderId].orders.push({
        _id,
        recipe,
        quantity,
        orderId,
        buyer,
        suplier,
        status,
        prepTime
      });
        return result;
    }, {}))

    const jointOrderDisplay = jointOrders ? jointOrders.map((order) => <JointOrder key={order.orderId} order={order} />) : <h1>no orders</h1>

    
    return (
      <div>
        <h1>Your Orders</h1>
        {jointOrderDisplay}
      </div>
    )
  }
}

  
const mapStateToProps = state => ({
  auth: state.auth
})  

export default connect(mapStateToProps)(OrderPage);