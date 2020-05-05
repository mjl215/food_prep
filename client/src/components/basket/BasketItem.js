import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from "uuid";

import RecipeImage from '../recipe/commonRecipe/RecipeImage';
import { setUser } from '../../actions/AuthActions';
import setHeader from '../../utils/setHeader';

class BasketItem extends Component {
  constructor(props){
    super(props)  

    this.state = {
      id: this.props.item._id,
      recipeId: this.props.item.recipe,
      basketId: this.props.item.basketId,
      owner: this.props.item.owner,
      title: null,
      costPerMeal: null,
      image: null,
      quantity: this.props.item.quantity,
      basePrepTime: this.props.item.basePrepTime,
      additionalPrepTime: this.props.item.additionalPrepTime
    }

    this.dragStart = this.dragStart.bind(this);
    this.splitOrder = this.splitOrder.bind(this);
  }

  async componentDidMount(){
    const res = await axios.get(`/recipe/${this.props.item.recipe}`);

    this.setState({
      title: res.data.title,
      costPerMeal: res.data.costPerMeal,
      image: res.data.image
    })
  }

  onChangeQuantity = async (value) => {
    this.setState((prevState) => ({
      quantity: prevState.quantity + value
    }), async () => {

      // const token = JSON.parse(localStorage.getItem('token'));

      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // }

      const config = setHeader();

      const basket = this.props.auth.basket
      const index = basket.findIndex((i) => i._id === this.state.id)

      if(index !== -1){
        basket[index] = {
          ...basket[index], 
          quantity: this.state.quantity
        }

        const body = {
          basket
        }
        
        await axios.post('/user/basket', body, config);
        this.props.setUser();  
      }
    });
  }

  onDeleteItem = async () => {
    const token = JSON.parse(localStorage.getItem('token'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    const basket = this.props.auth.basket
    
    const updatedBasket = basket.filter((item) => item._id !== this.state.id);
    
    console.log(updatedBasket)
    const body = {
      basket: updatedBasket
    }
    
    await axios.post('/user/basket', body, config);
    this.props.setUser();  
  }

  dragStart(e){
    const target = e.target;
    e.dataTransfer.setData('order_id', this.state.id);
    e.dataTransfer.setData('basket_id', this.state.basketId);
    e.dataTransfer.setData('owner_id', this.state.owner)
    
    // setTimeout(() => {
    //   target.style.display = "none"
    // }, 0);
  }

  async splitOrder(){

    const basket = this.props.auth.basket
    basket[basket.findIndex((el) => el._id === this.state.id)].basketId = uuid.v4();

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
    
  }

  render() {
    const {title, costPerMeal, quantity, recipeId, image, id, basketId, basePrepTime, additionalPrepTime} = this.state
    const price = costPerMeal * quantity;

    return (
      <div 
        draggable="true" 
        style={{margin: '10px', border:'2px solid grey'}}
        onDragStart={this.dragStart}
        id={basketId}
      >
        <div style={{display: 'inline-block'}}>
          <RecipeImage image={image} />
        </div>
        <Link to={`/recipe/${recipeId}`}>
          <p style={{display: 'inline-block'}}>{title}</p>
        </Link>
        <p style={{display: 'inline-block'}}>£{costPerMeal}</p>
        <div style={{display: 'inline-block'}}>
          <button 
            onClick={() => this.onChangeQuantity(1)}
            style={{display: 'inline-block'}}
          >+</button>
          <p style={{display: 'inline-block'}}>{quantity}</p>
          <button 
            onClick={() => this.onChangeQuantity(-1)}
            style={{display: 'inline-block'}}
          >-</button>
        </div>
        <p style={{display: 'inline-block'}}>Prep Time: {basePrepTime + (additionalPrepTime * (quantity-1))} mins</p>
        <p style={{display: 'inline-block'}}> £{price}</p>
        <button
          onClick={this.splitOrder}
          style={{display: 'inline-block'}}
        >
          split to sperate order
        </button>
        <button onClick={() => this.onDeleteItem()}>Remove Item</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(BasketItem);