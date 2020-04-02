import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    console.log(this.props.auth);
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

  render() {

    const {firstName, lastName, email, bio, address, profilePicture, active } = this.state;

    return (
      <div>
        <p>FirstName - {firstName}</p>
        <p>lastName  - {lastName}</p>
        <p>Email - {email}</p>
        <p>Bio - {bio}</p>
        <p>Address - {address}</p>
        <p>Profile Picture - {profilePicture || <span>no picture uploaded</span>}</p>
        <button>Change Password</button>
        <button>Save Changes</button>
        <button>Delete Account</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps)(UserDetails);