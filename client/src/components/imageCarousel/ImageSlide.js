import React from 'react'

const ImageSlide = ({ imageId }) => {
  const styles = {
    backgroundImage: `url("http://localhost:3000/recipe/image/${imageId}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100px',
      height: '100px'
  };

  return (
    <div 
      className="image-slide" 
      style={styles}
    > 
      
    </div>
  )
}


export default ImageSlide;