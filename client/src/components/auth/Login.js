import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import axios from 'axios';

import { loginUser } from '../../actions/AuthActions';
import Alert from '../common/Alert';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: {
        emailError: null,
        passwordError: null
      }
    }

    this.forgotPassword = this.forgotPassword.bind(this);
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
      this.props.loginUser(body, config);

    } catch (error) {
      console.log(error)
    }

    this.setState(() => ({
      password: ''
    })
    )
  }

  forgotPassword(){
    this.props.history.push('/forgot-password')
  }

  render() {
    if(this.props.auth.authorized){
      return <Redirect to='/'/>
    }

    return (
      <div className="login">
        <div className="login__grid">
          <h1 className="login__title">Login</h1>
          <form 
            onSubmit={this.onSubmit}
            className="login__form"
          > 
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              value={this.state.email}
              onChange={(e) => this.onChange(e)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="enter password"
              value={this.state.password}
              onChange={(e) => this.onChange(e)}
            />
            <Alert errorType='login'/>
            <input
              type="submit"
              className="login__form--submit"
            />
            <p onClick={() => this.forgotPassword()}>Forgot Password?</p>
          </form>
          {/*<button onClick={() => this.onClick()}>test</button>*/}
        </div>
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

