import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {registerUser} from '../../actions/AuthActions';

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            lat: undefined,
            long: undefined,
            userType: ""
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
            userType: this.state.userType,
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

    onUserSelectionButton = (e) => {
        console.log('hi')
        this.setState({
            userType: e.target.value
        })
    }

    render() {
        if(this.props.auth.authorized){
            return <Redirect to='/'/>
        }

        if(this.state.userType == ""){
            return (
                <div>
                    <h2>Would you like to register as a Customer or Chef</h2>
                    <button 
                        onClick={(e) => this.onUserSelectionButton(e)}
                        value='BUYER'
                    >
                            Customer
                        </button>
                    <button
                        onClick={(e) => this.onUserSelectionButton(e)}
                        value='SUPLIER'
                    >
                        Chef
                    </button>
                </div>
            )
        }


        if(this.state.userType === 'BUYER' || 'SUPPLIER'){
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
                <button
                        value={undefined}
                        onClick={(e) => this.onUserSelectionButton(e)}
                    >
                        back
                </button>
                </div>
                )
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })
  
  const mapDispatchToProps = (dispatch) => ({
    registerUser: (body, config) => dispatch(registerUser(body, config))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Register);
