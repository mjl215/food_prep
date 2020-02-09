import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setUser } from '../../actions/AuthActions';
import BasketItem from './BasketItem';

class JointOrderContainer extends Component {
  constructor(props){
    super(props)  

    this.state = {
      errors: undefined
    }

    this.drop = this.drop.bind(this);
  }

  async drop(e){
    e.preventDefault();
    const draggedOrderId = e.dataTransfer.getData('order_id');
    const draggedBasketId = e.dataTransfer.getData('basket_id');
    const draggedOwnerId = e.dataTransfer.getData('owner_id');
    

    const target = e.target;
    
    console.log(this.props.auth.basket);
  
    if(draggedOwnerId === this.props.item.owner && draggedBasketId !== this.props.item.basketId){
      const basket = this.props.auth.basket;
      basket[basket.findIndex((el) => el._id === draggedOrderId)].basketId = this.props.item.basketId;

      const token = JSON.parse(localStorage.getItem('token'));

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      const body = {
        basket: basket
      }
  
      await axios.post('/user/basket', body, config);
      this.props.setUser(); ;

      
    } else {
      console.log('the owners are not the same, no change')
    }
  }

  dragOver(e){
    e.preventDefault();
  }
  
  render() {

    const basketId = this.props.item.basketId;
    
    console.log(this.props.auth.basket);
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
    <h2> total £{}</h2>
      </div>
    )
  }
}

const mapStateToProps =(state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  setUser: () => dispatch(setUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(JointOrderContainer);