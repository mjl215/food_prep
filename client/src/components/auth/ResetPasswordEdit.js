import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ResetPasswordEdit extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: ''
    }

   this.onClick = this.onClick.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  async onClick(e){
    e.preventDefault();

    try {
      const { email, password, newPassword, confirmPassword } = this.state

      const body = {
        email,
        password,
        newPassword,
        confirmPassword
      }

      const token = JSON.parse(localStorage.getItem('token'));
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      
      const {data} = await axios.post('user/resetPasswordEdit', body, config);

      console.log(data);
    } catch (error) {
      this.setState({
        password: '',
        newPassword: '',
        confirmPassword: ''
      })
    }

    

  }



  render() {
    return (
      <div>
        <form autoComplete="off">
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              value={this.state.email} 
              onChange={(e) => this.onChange(e)}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="passowrd">Current Password</label>
            <input 
              type="password" 
              name="password" 
              value={this.state.password} 
              onChange={(e) => this.onChange(e)}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              value={this.state.newPassword} 
              onChange={(e) => this.onChange(e)}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={this.state.confirmPassword} 
              onChange={(e) => this.onChange(e)}
              autoComplete="off"
            />
          </div>
          <button
            onClick={(e) => this.onClick(e)}
          >Confirm Password change</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps =(state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps)(ResetPasswordEdit);
