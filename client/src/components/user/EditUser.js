import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  render() {

    console.log(this.props)

    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps)(EditUser);