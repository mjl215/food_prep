import React, { Component } from 'react';
import { connect } from 'react-redux';

import BasketItem from './BasketItem';

class BasketPage extends Component {
  constructor(props){
    super(props)  
  }

  componentDidMount(){
    
  }


  render() {

    const basketItems = this.props.auth.basket.length > 0 && this.props.auth.basket.map((item) => {
      return <BasketItem key={item._id} item={item}/>
    })
    console.log(this.props.auth)

    return (
      <div>
        <p>Basket page</p>
        {basketItems ? basketItems : <p>no items in basket</p>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);