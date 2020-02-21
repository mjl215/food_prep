import React, { Component } from 'react';
import OrderItem from './OrderItem';

class JointOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  

  render() {

    const orderDisplay = this.props.order.orders.map((order) => <OrderItem key={order._id} order={order} />)

    console.log(this.props)

    return (
      <div style={{border: 'thin black solid'}}>
        JointOrder
        {orderDisplay}
      </div>
    )
  }
}

export default JointOrder;