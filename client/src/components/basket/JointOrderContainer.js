import React, { Component } from 'react';
import BasketItem from './BasketItem';

class JointOrderContainer extends Component {
  constructor(props){
    super(props)  

    this.state = {
      errors: undefined
    }

  }
  
  render() {
    console.log(this.props);
    const basket = this.props.item.orders.map((order) => {
      return <BasketItem key={order._id} item={order}/>
    })
    return (
      <div style={{border: 'thin red solid'}}>
        {basket}
      </div>
    )
  }
}

export default JointOrderContainer;