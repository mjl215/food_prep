import { connect } from 'react-redux';
import  axios from 'axios';
import React, { Component, Fragment } from 'react';

import RecipeImage from '../recipe/commonRecipe/RecipeImage';

class OrderItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: null,
      loading: true
    }

    this.onMarkComplete = this.onMarkComplete.bind(this);
    
}

async componentDidMount(){
    const res = await axios.get(`/recipe/${this.props.order.recipe}`)
    
    this.setState({
      recipe: res.data,
      loading: false
    })
}

async onMarkComplete(){
  const res = await axios.post(`/user/orders/${this.props.order._id}`);

  console.log(res);
}


  render() {
    if(this.state.loading){
      return <h3>Loading Order</h3>
    } else {

      const {title, costPerMeal, image} = this.state.recipe;
      const { quantity, status } = this.props.order;
      const { userType } = this.props.auth;
      const totalCost = costPerMeal *  quantity;

      const buttons = userType === 'SUPLIER' || 'ADMIN' ? (
        <Fragment>
          <button>Details</button>
          <button onClick={this.onMarkComplete}>Mark Complete</button>
        </Fragment>
        
      ) : (
        <button>Cancel</button>
      )

      return (
        <div>
            <h3>{title}</h3>
            <RecipeImage image={image} />
            <h4>£{costPerMeal}</h4>
            <h4>{quantity}</h4>
            <h4>£{totalCost}</h4>
            <h4>{status}</h4>
            {buttons}
          </div>
      )
    }
    
  }
}





const mapStateToProps = state => ({
auth: state.auth
}) 

export default connect(mapStateToProps)(OrderItem);
