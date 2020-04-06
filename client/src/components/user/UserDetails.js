import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';

import { clearUser } from '../../actions/AuthActions';

class UserDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      bio: undefined,
      address: undefined,
      profilePicture: undefined,
      active: true
    }
  }

  componentDidMount(){

    const {firstName, lastName, email, bio, location, profilePicture, active } = this.props.auth;

    this.setState({
      firstName,
      lastName,
      email,
      bio,
      address: location.address,
      profilePicture,
      active
    })
  }

  async onDeleteUser(e){
    e.preventDefault();

    try {

      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    }

    await axios.delete('/user', config);
    this.props.clearUser();

    } catch (error) {
      console.log(error)
    }

  }

  onChangePassword(){
    this.props.history.push('/reset-password')
  }

  render() {

    const {firstName, lastName, email, bio, address, profilePicture, active } = this.state;

    return (
      <div>
        <p>FirstName - {firstName} <EditIcon /></p>
        <p>lastName  - {lastName}</p>
        <p>Email - {email}</p>
        <p>Bio - {bio}</p>
        <p>Address - {address}</p>
        <p>Profile Picture - {profilePicture || <span>no picture uploaded</span>}</p>
        <button onClick={(e) => this.onChangePassword(e)}>Change Password</button>
        <button>Save Changes</button>
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