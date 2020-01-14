import React, { Component } from 'react';
import axios from 'axios';

class RecipeDisplay extends Component {
    constructor(props) {
        super(props);
            this.state = {
            images: null
            }
    
    }

    componentDidMount = async () => {

        const res = await axios.get('/recipe/image');

        console.log(res);

        this.setState({images: res.data})
    }

    render() {

        const renderRecipe = this.state.images && this.state.images.map((img) =>{
            return <img key={img._id} src={`http://localhost:3000/recipe/image/${img._id}`}/>}
            )

        return (
            <div>
                {renderRecipe}
                
            </div>
        )
    }
}

export default RecipeDisplay;