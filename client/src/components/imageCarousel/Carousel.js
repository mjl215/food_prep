import React, { Component } from 'react';

import ImageSlide from './ImageSlide';
import Arrow from './Arrow';

class Carousel extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      imgUrls: props.urlArray
    };

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  previousSlide(){
    const lastIndex = this.state.imgUrls.length -1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex -1;

    this.setState({
      currentImageIndex: index
    })
  }

  nextSlide(){
    const lastIndex = this.state.imgUrls.length -1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex? lastIndex : currentImageIndex +1;

    this.setState({
      currentImageIndex: index
    });
  }

  render() {

    const styles = {
      width: '100px',
      height: '100px',
      padding: '50px'
    }

    return (
      <div className="carousel" style={styles}>
        <Arrow
          direction="left"
          clickFunction={ this.previousSlide }
          glyph="&#9664;"
        />
        <ImageSlide imageId={ this.state.imgUrls[this.state.currentImageIndex].id } />
        <Arrow
          direction="right"
          clickFunction={ this.nextSlide }
          glyph="&#9654;"
        />
      </div>
    )
  }
}


export default Carousel;