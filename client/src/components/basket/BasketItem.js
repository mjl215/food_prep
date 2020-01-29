import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import RecipeImage from '../recipe/commonRecipe/RecipeImage';

class BasketItem extends Component {
  constructor(props){
    super(props)  

    this.state = {
      id: this.props.item.recipe,
      title: null,
      costPerMeal: null,
      image: null,
      quantity: this.props.item.quantity
    }
  }

  async componentDidMount(){
    const res = await axios.get(`/recipe/${this.props.item.recipe}`);
    console.log(res)
    this.setState({
      title: res.data.title,
      costPerMeal: res.data.costPerMeal,
      image: res.data.image
    })
  }

  render() {
    const {title, costPerMeal, quantity, id, image} = this.state

    const price = costPerMeal * quantity;

    return (
      <div>
        <RecipeImage image={image} />
        <Link to={`/recipe/${id}`}>
          <p>{title}</p>
        </Link>
        <p>£{costPerMeal}</p>
        <div>
          <button>+</button>
          <p>{quantity}</p>
          <button>-</button>
        </div>
        <p>£{price}</p>
      </div>
    )
  }
}


export default BasketItem;