import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderPage extends Component {
  constructor(props) {
    super(props);
}


  render() {
    return (
      <div>
        order page
      </div>
    )
  }
}

  
const mapStateToProps = state => ({
  auth: state.auth
})  

export default connect(mapStateToProps)(OrderPage);