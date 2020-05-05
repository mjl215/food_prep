import React, { Component } from 'react';
import axios from 'axios';

class ForgotPassword extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: ''
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const body = {
        email: this.state.email
      }
      const { data } = await axios.post('/user/forgotPassword', body);

    } catch (error) {
      
    }

  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="enter email"
            value={this.state.email}
            onChange={(e) => this.onChange(e)}
          />
          <input
            type="submit"
          />
        </form>
      </div>
    )
  }
}

export default ForgotPassword;