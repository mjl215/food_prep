import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import BasketSuplierContainer from './BasketSuplierContainer';
import { setUser } from '../../actions/AuthActions';
import setHeader from '../../utils/setHeader';

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
    
    // const token = JSON.parse(localStorage.getItem('token'));
      
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   }
    // }

    const config = setHeader();

    const body = {
      basket: this.props.auth.basket
    }

    await axios.post('user/basket/checkout', body, config)

    this.props.setUser();
    
  }


  render() {

    const recipeOwnerArray = this.props.auth.basket.length > 0 && Object.values(this.props.auth.basket.reduce((result, 
      {_id, recipe, quantity, owner, basketId, costPerMeal, basePrepTime, additionalPrepTime}) => {
        if(!result[owner]){
          result[owner] = {
            owner,
            orders: []
          }
        };

        result[owner].orders.push({
          _id,
          recipe,
          quantity,
          owner,
          basketId,
          costPerMeal,
          basePrepTime, 
          additionalPrepTime
        });
          return result;
    }, {})); 

    const BasketContainers = recipeOwnerArray && recipeOwnerArray.map((item) => <BasketSuplierContainer key={item.owner} orders={item.orders} owner={item.owner}/>)
    const totalcost = this.props.auth.basket.length > 0 && this.props.auth.basket.reduce((sum, item) => sum + (item.quantity * item.costPerMeal), 0)
    return (
      <div>
        <p>Basket page</p>
        {BasketContainers}
        <button onClick={this.onCheckout}>Checkout</button>
        <h2>Total £{totalcost}</h2>
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