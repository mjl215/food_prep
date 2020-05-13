import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

import {registerUser} from '../../actions/AuthActions';
import Alert from '../common/Alert'

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            bio: '',
            password: '',
            confirmPassword: '',
            lat: null,
            lng: null,
            enteredAddress: '',
            suggestedAdresses: [],
            selectedAddress: '',
            selectedAddressId: '',
            userType: "",
            profilePicture: undefined
        }

        this.onSearchAddress = this.onSearchAddress.bind(this);
        this.selectAddress = this.selectAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = async (e) => {
        e.preventDefault();

        
        // if(this.state.password !== this.state.confirmPassword){
        //     alert('passwords must match')
        //     this.setState({password: '', confirmPassword: ''})
        // }

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            bio: this.state.bio,
            userType: this.state.userType,
            password: this.state.password,
            active: true,
            profileImage: undefined,
            confirmPassword: this.state.confirmPassword,
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
        
        this.props.registerUser(body, config, this.state.profilePicture);
          //const res = await axios.post('/user', body, config)
    }

    onUserSelectionButton = (e) => {
        this.setState({
            userType: e.target.value
        })
    }

    async onSearchAddress(){
        
        console.log('click')

        try {
            const res = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(this.state.enteredAddress)}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`);

            console.log(res)
            this.setState({
                suggestedAdresses: res.data.results
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    selectAddress(addressId, address, lat, lng){
        this.setState({
            selectedAddressId: addressId,
            selectedAddress: address,
            lat,
            lng
        })
    }

    openFileUpload(){
        document.getElementById('file').click()
    }

    onChangeHandler = (e) =>{

        this.setState({
            profilePicture: e.target.files[0],
            //loaded: 0,
        })
    };


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
                <div className="register">
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
                    <div className="register__grid">
                        <h1 className="register__title">Register</h1>
                        <form 
                            onSubmit={this.onSubmit}
                            className="login__form"
                            noValidate
                        >
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder=""
                                value={this.state.firstName}
                                onChange={(e) => this.onChange(e)}
                            />
                            <Alert errorType={'register-name'}/>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder=""
                                value={this.state.lastName}
                                onChange={(e) => this.onChange(e)}
                            />
                            <Alert errorType={'register-name'}/>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="enter email"
                                value={this.state.email}
                                onChange={(e) => this.onChange(e)}
                            />
                            <label htmlFor="bio">Bio</label>
                            <input
                                type="textarea"
                                name="bio"
                                placeholder="Enter information about yourself"
                                value={this.state.bio}
                                onChange={(e) => this.onChange(e)}
                            />
                            <Alert errorType={'register-name'}/>
                            <Alert errorType={'register-email'}/>
                            <label htmlFor="passord">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="enter password"
                                value={this.state.password}
                                onChange={(e) => this.onChange(e)}
                            />
                            <Alert errorType={'register-password'}/>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                onChange={(e) => this.onChange(e)}
                            />
                            <Alert  errorType={'register-confirmPassword'}/>
                            <label htmlFor="Search Address">Search Address</label>
                            <div>
                                <input 
                                    type="address"
                                    name="enteredAddress"
                                    placeholder="address"
                                    value={this.state.enteredAddress}
                                    onChange={(e) => this.onChange(e)}
                                />
                                <button 
                                    onClick={this.onSearchAddress}
                                    type="button"
                                >search address</button>
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
                            <Alert errorType={'register-address'}/>
                            <label htmlFor="addProfilePicture">Add a Profile Picture</label>
                            <div>
                                <input 
                                    type="button" 
                                    id="loadFileXml" 
                                    value="upload photo" 
                                    onClick={this.openFileUpload}
                                    
                                />
                                <input 
                                    type="file" 
                                    style={{display:'none'}} 
                                    id="file" 
                                    name="file"
                                    onChange={this.onChangeHandler} 
                                />
                            </div>
                            <button
                                type="button"
                                onClick={this.onSubmit}
                            >
                                Register
                            </button>
                            <button
                                    value={undefined}
                                    onClick={(e) => this.onUserSelectionButton(e)}
                                >
                                    back
                            </button>
                        </form>
                    </div>
                </div>
                )
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })
  
  const mapDispatchToProps = (dispatch) => ({
    registerUser: (body, config, image) => dispatch(registerUser(body, config, image))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Register);
