import React, { Component } from 'react';
import JointBasketContainer from './JointBasketContainer';

class BasketSuplierContainer extends Component {
  constructor(props){
    super(props)  

    this.state = {
      errors: undefined
    }

  }

  render() {
    

    const jointOrderSplit = this.props.orders.length > 0 && Object.values(this.props.orders.reduce((result, {_id, recipe, quantity, owner, basketId}) => {
      if(!result[basketId]){
        result[basketId] = {
          basketId,
          owner,
          orders: []
        }
      };

      result[basketId].orders.push({
        _id,
        recipe,
        quantity,
        owner,
        basketId
      });
        return result;
    }, {})); 

    const basketItems = jointOrderSplit && jointOrderSplit.map((item) => {
      return <JointBasketContainer key={item.basketId} item={item}/>
    })

    return (
      <div style={{border: 'thin black solid', padding: '30px'}}>
        <h1>orders from {this.props.owner}</h1>
        {basketItems ? basketItems : <p>no items in basket</p>}
      </div>
    )
  }
}


export default BasketSuplierContainer;