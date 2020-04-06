import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecipeGridItem from '../recipeGrid/RecipeGridItem';

class UserRecipes extends Component {
  constructor(props){
    super(props);

    this.state = {
      recipes: undefined
    }
  }

  async componentDidMount(){
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }

      const {data} = await axios.get('/recipe/get-recipe/owner', config);

      this.setState({
        recipes: data
      })
      
    } catch (error) {
      
    }
    
  }

  render() {

    const recipeGrid = this.state.recipes && this.state.recipes.map((recipe) => <RecipeGridItem key={recipe._id} recipe={recipe}/>)

    return (
      <div className="recipeDisplay">
        {this.state.recipes ? recipeGrid : <p> loading recipes</p> }
      </div>
    )
  }
}

const mapStateToProps =(state) => ({
  //auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps)(UserRecipes);