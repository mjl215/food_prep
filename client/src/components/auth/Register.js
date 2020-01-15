import React, { Component } from 'react';
import { connect } from 'react-redux';


import {registerUser} from '../../actions/AuthActions';

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            lat: null,
            long: null
        }
    }
    

    onChange(e){
        
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = async (e) => {
        e.preventDefault();

        
        if(this.state.password !== this.state.confirmPassword){
            alert('passwords must match')
            this.setState({password: '', confirmPassword: ''})
        }

        const user = {
            name: this.state.name,
            email: this.state.email,
            userType: 'ADMIN',
            password: this.state.password,
        };

        const body = JSON.stringify(user);

        const config = {
            headers: {
                'Content-Type': 'application/json'
          }};
        
          this.props.registerUser(body, config);
        
          //const res = await axios.post('/user', body, config)
        
        

    }

    render() {
        return (
            <div>
        <form onSubmit={this.onSubmit}>
            <input
                type="text"
                name="name"
                placeholder="name"
                value={this.state.name}
                onChange={(e) => this.onChange(e)}
            />
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
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
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

const mapStateToProps = (state) => ({
    
  })
  
  const mapDispatchToProps = (dispatch) => ({
    registerUser: (body, config) => dispatch(registerUser(body, config))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Register);
