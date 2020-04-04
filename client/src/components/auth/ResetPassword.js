import React, { Component } from 'react'
import axios from 'axios';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  async componentDidMount(){
    console.log(this.props.match.params.passwordToken);

    const res = await axios.get('/user/resetCheck');
    console.log(res);
  }


  render() {
    return (
      <div>
        hi
      </div>
    )
  }
}

export default ResetPassword;