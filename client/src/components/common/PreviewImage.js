import React, { Component } from 'react'

export default class PreviewImage extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }
  
  render() {
    return (
      <div>
        <p>hiiiiiiiiii</p>
        <img className="preview__image--div" src={this.props.img} />
      </div>
    )
  }
}
