import React, { Component } from 'react'
import axios from 'axios';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: undefined,
      passwordToken: undefined,
      resetAllowed: false,
      newPassword: '',
      confirmPassword: ''
    };

    this.onClick= this.onClick.bind(this);
  }

  async componentDidMount(){
    try {
      const config = {
        params: {
          passwordToken: this.props.match.params.passwordToken
        }
      }
  
      const res = await axios.get('/user/resetCheck', config);
      
      if(res.status === 200){
        console.log(res);

        this.setState({
          email: res.data.email,
          passwordToken: this.props.match.params.passwordToken,
          resetAllowed: true
        })
      }

    } catch (error) {
      console.log(error.response);
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
}

  async onClick(){

    try {
      const {email, passwordToken, newPassword, confirmPassword} = this.state;

      const body = {
        email,
        passwordToken,
        newPassword,
        confirmPassword
      }

      const res = await axios.post('/user/resetPassword', body);

      console.log(res);

    } catch (error) {
      console.log(error);
    }

    
}


  render() {
    return (
      <div>
        <p>Email: {this.state.email}</p>
        <div>
          <p>New Password</p>
          <input 
            type="password" 
            name="newPassword" 
            value={this.state.newPassword}
            onChange={(e) => this.onChange(e)}
          />
        </div>
        <div>
          <p>Confirm Passowrd</p>
          <input 
            type="password" 
            name="confirmPassword"
            value={this.state.confirmPassword} 
            onChange={(e) => this.onChange(e)}  
          />
        </div>
        <button 
          onClick={this.onClick}  
        >
          change password
        </button>
      </div>
    )
  }
}

export default ResetPassword;