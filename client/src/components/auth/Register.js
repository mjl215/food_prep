import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {registerUser} from '../../actions/AuthActions';
import Axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            lat: null,
            lng: null,
            enteredAddress: '',
            suggestedAdresses: [],
            selectedAddress: '',
            selectedAddressId: '',
            userType: ""
        }

        this.onSearchAddress = this.onSearchAddress.bind(this);
        this.selectAddress = this.selectAddress.bind(this);
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
            location: {
                lat: this.state.lat,
                lng: this.state.lng,
                address: this.state.selectedAddress,
                addressId: this.state.selectedAddressId
            }
            
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

    async onSearchAddress(){
        const res = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(this.state.enteredAddress)}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`);


        this.setState({
            suggestedAdresses: res.data.results
        })
    }

    selectAddress(addressId, address, lat, lng){
        this.setState({
            selectedAddressId: addressId,
            selectedAddress: address,
            lat,
            lng
        })
    }



    render() {
        if(this.props.auth.authorized){
            return <Redirect to='/'/>
        }

        if(this.state.userType === ""){
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
                <div>
                    <input 
                        type="address"
                        name="enteredAddress"
                        placeholder="address"
                        value={this.state.enteredAddress}
                        onChange={(e) => this.onChange(e)}
                    />
                    <button onClick={this.onSearchAddress}>search address</button>
                    {this.state.suggestedAdresses && this.state.suggestedAdresses.map((addr) => {
                        const {lat, lng} = addr.geometry.location;
                        const {place_id: id, formatted_address: address} = addr
                        
                        return ( 
                            <p 
                                key={addr.place_id}
                                onClick={() => this.selectAddress(id, address, lat, lng)}
                            >
                                {addr.formatted_address}
                            </p>
                        )
                    })}
                </div>
                
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
