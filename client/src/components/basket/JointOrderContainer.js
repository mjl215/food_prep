import React, { Component } from 'react';
import BasketItem from './BasketItem';

class JointOrderContainer extends Component {
  constructor(props){
    super(props)  

    this.state = {
      errors: undefined
    }

  }

  drop(e){
    e.preventDefault();
    const orderId = e.dataTransfer.getData('order_id')
    console.log('orderId: ' + orderId)

    const target = e.target;
    console.log('joint container : ' + target.id)
   
    
  }

  dragOver(e){
    e.preventDefault();
  }
  
  render() {

    const basketId = this.props.item.basketId;
    
    console.log(this.props);
    const basket = this.props.item.orders.map((order) => {
      return <BasketItem key={order._id} item={order}/>
    })
    return (
      <div 
        style={{border: 'thin red solid'}}
        onDrop={this.drop}
        onDragOver={this.dragOver}
        id={basketId}
      >
        {basket}
      </div>
    )
  }
}

export default JointOrderContainer;