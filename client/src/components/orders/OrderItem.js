import { connect } from 'react-redux';
import  axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      const { quantity, status, prepTime } = this.props.order;
      const { userType } = this.props.auth;
      const totalCost = costPerMeal *  quantity;

      const suplierButtons =  (
          <button onClick={this.onMarkComplete}>Mark Complete</button>
      ) 

      const buyerButton = (
        <button>cancel</button>
      )

      return (
        <div>
            <h3 style={{display: 'inline-block', margin: '10px'}}>{title}</h3>
            <div style={{display: 'inline-block', margin: '10px'}}>
              <RecipeImage image={image} />
            </div>
            <h4 style={{display: 'inline-block', margin: '10px'}}>£{costPerMeal}</h4>
            <h4 style={{display: 'inline-block', margin: '10px'}}>{quantity}</h4>
            <h4 style={{display: 'inline-block', margin: '10px'}}>£{totalCost}</h4>
            <h4 style={{display: 'inline-block', margin: '10px'}}>{prepTime} mins</h4>
            <h4 style={{display: 'inline-block', margin: '10px'}}> {status}</h4>
            <Link to={`/order/${this.props.order.orderId}`}><button style={{display: 'inline-block', margin: '10px'}}>Details</button></Link>
            {userType === 'BUYER' ? buyerButton: suplierButtons}
            
          </div>
      )
    }
    
  }
}





const mapStateToProps = state => ({
auth: state.auth
}) 

export default connect(mapStateToProps)(OrderItem);
