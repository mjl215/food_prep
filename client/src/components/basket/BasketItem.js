import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import RecipeImage from '../recipe/commonRecipe/RecipeImage';
import { setUser } from '../../actions/AuthActions';
class BasketItem extends Component {
  constructor(props){
    super(props)  

    this.state = {
      id: this.props.item._id,
      recipeId: this.props.item.recipe,
      title: null,
      costPerMeal: null,
      image: null,
      quantity: this.props.item.quantity
    }
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

      const token = JSON.parse(localStorage.getItem('token'));

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      const basket = this.props.auth.basket
      const index = basket.findIndex((i) => i._id === this.state.id)

      if(index !== -1){
        basket[index] = {_id: this.state.id, recipe: this.state.recipeId, quantity: this.state.quantity}

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

  render() {
    const {title, costPerMeal, quantity, recipeId, image} = this.state
    const price = costPerMeal * quantity;

    return (
      <div>
        <RecipeImage image={image} />
        <Link to={`/recipe/${recipeId}`}>
          <p>{title}</p>
        </Link>
        <p>£{costPerMeal}</p>
        <div>
          <button onClick={() => this.onChangeQuantity(1)}>+</button>
          <p>{quantity}</p>
          <button onClick={() => this.onChangeQuantity(-1)}>-</button>
        </div>
        <p>£{price}</p>
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