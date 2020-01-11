import React, { Component } from 'react'
import axios from 'axios';

export default class UploadRecipe extends Component {
    constructor(props) {
        super(props);
            this.state = {
            selectedFile: null
            }
    
    }

    componentDidMount = async () => {
        const res = await axios.get('/recipe/image');
        res.data.forEach(element => {
            console.log(element.image.data)
        });
    }

    onClickHandler = async () => {
        const data = new FormData() 
        data.append('upload', this.state.selectedFile);

        const res = await axios.post('/recipe/image', data);
        console.log(res);
    }

    onChangeHandler = (e) =>{
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0,
        })
    }

    

    render() {
        return (
            <form>
                <p>recipe</p>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
            </form>
        )
    }
}
