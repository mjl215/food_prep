import React, { Component } from 'react';
import { connect } from 'react-redux';

//import axios from 'axios';

import { loginUser } from '../../actions/AuthActions'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
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
      const user = {
        email: this.state.email,
        password: this.state.password
      }

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const body = JSON.stringify(user);
      this.props.loginUser(body, config)
    } catch (error) {
      console.log(error)
    }

    this.setState(() => ({
      password: ''
    })
    )
  }

  render() {

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            name="email"
            placeholder="enter email"
            value={this.state.email}
            onChange={(e) => this.onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="enter password"
            value={this.state.password}
            onChange={(e) => this.onChange(e)}
          />
          <input
            type="submit"
          />
        </form>
        {/*<button onClick={() => this.onClick()}>test</button>*/}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (body, config) => dispatch(loginUser(body, config))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);

