import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';

import { clearUser, setUser } from '../../actions/AuthActions';
import ProfilePicture from './ProfilePicture';
import PreviewImage from '../common/PreviewImage'

import setHeader from '../../utils/setHeader';


class UserDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
      editDisabled: false,
      firstName: "",
      originalFirstName: "",
      lastName: "",
      originalLastName: "",
      email: "",
      originalEmail: "",
      bio: "",
      originalBio: "",
      address: "",
      newProfilePicture: "",
      previewImage: "",
      active: true
    }

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSaveChanges = this.onSaveChanges.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  componentDidMount(){

    const {firstName, lastName, email, bio, location, profilePicture, active } = this.props.auth;

    this.setState({
      firstName,
      originalFirstName: firstName,
      lastName,
      originalLastName: lastName,
      email,
      originalEmail: email,
      bio,
      originalBio: bio,
      address: location.address,
      profilePicture,
      active
    })
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onClick(){
    this.setState((prevState) => ({
      editDisabled: !prevState.editDisabled
    }))
  }

  async onSaveChanges(){
    try {
      const { firstName, originalFirstName, lastName, originalLastName, email, originalEmail,  bio, originalBio } = this.state;
      const config = setHeader();

      const body = {}

      if(firstName !== originalFirstName){
        body.firstName = firstName;
      };

      if(lastName !== originalLastName){
        body.lastName = lastName;
      }

      if(email !== originalEmail){
        body.email = email;
      }
      
      if(bio !== originalBio){
        body.bio = bio;
      }


      const res = await axios.patch('/user/update', body, config);

      if(this.state.newProfilePicture){
        const config = setHeader()
        const data = new FormData();
        data.append('upload', this.state.newProfilePicture);
        const imageRes = await axios.patch('/user/profilePicture/1', data, config);
        console.log(imageRes);
      }
      
      


    } catch (error) {
      console.log(error)
    }

    
  }

  async onDeleteUser(e){
    e.preventDefault();

    try {

      // const token = JSON.parse(localStorage.getItem('token'));
      // const config = {
      //   headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`
      //   }
      // }

      const config = setHeader();

    await axios.delete('/user', config);
    this.props.clearUser();

    } catch (error) {
      console.log(error)
    }

  }

  onChangePassword(){
    this.props.history.push('/reset-password')
  }

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        previewImage: URL.createObjectURL(event.target.files[0])
      });
    }

    this.setState({
      newProfilePicture: event.target.files[0]
    })
   }

  render() {

    const {firstName, lastName, email, bio, address, profilePicture, active } = this.state;

   

    return (
      <div>
        <div>
          <p>FirstName</p>
          <input 
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            disabled={this.state.editDisabled}
          />
        </div>
        <div>
          <p>lastName</p>
          <input 
            type="text"
            name="lastName"
            disabled={this.state.editDisabled}
            value={this.state.lastName}
            onChange={(e) => this.onChange(e)}
          />
        </div>
        <div>
          <p>Email</p>
          <input 
            type="text"
            name="email"
            disabled={this.state.editDisabled}
            value={this.state.email}
            onChange={(e) => this.onChange(e)}
          />
        </div>
        <div>
          <p>Bio</p>
          <input 
            type="textarea"
            name="bio"
            disabled={this.state.editDisabled}
            value={this.state.bio}
            onChange={(e) => this.onChange(e)}
          />
        </div>
        
        <p>Address - {address}</p>
        <div>Profile Picture - {<ProfilePicture userId={this.props.auth.id} /> || <span>no picture uploaded</span>}</div>
        <PreviewImage img={this.state.previewImage} />
        <input type="file" onChange={this.onImageChange} />
        <button
          onClick={this.onClick}
        > Edit Details <EditIcon /></button>
        <button onClick={(e) => this.onChangePassword(e)}>Change Password</button>
        <button onClick={this.onSaveChanges}>Save Changes</button>
        <button onClick={(e) => this.onDeleteUser(e)}>Delete Account</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch(clearUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);