import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '', // New state variable for error message
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch('http://172.20.10.5:4000/', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('User Logged IN');

      if (data.status === 'ok') {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('LoggedIn', true);
        window.localStorage.setItem('userId', data.userId);
        window.location.href = '/dashboard';
      } else {
        // Update the error message state variable
        this.setState({ errorMessage: 'Incorrect username or password' });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <center>
        <form onSubmit={(e) => this.handleSubmit(e)} className='form'>
          <h1>Sign In</h1>

          {errorMessage && <p>{errorMessage}</p>}

          <div className='form-group'>
            <input
              type='email'
              name='email'
              className='login-user'
              placeholder='Enter email'
              value={email}
              onChange={this.handleChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              name='password'
              className='login-pass'
              placeholder='Enter password'
              value={password}
              onChange={this.handleChange}
            />
          </div>

          <div className='d-grid'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>

          <p className='forgot-password text-right'>
            New User? <a href='/signup'>Register</a>
          </p>
        </form>
      </center>
    );
  }
}
