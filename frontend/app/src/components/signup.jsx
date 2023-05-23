import React, { useState } from 'react';

export default function SignUp() {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (userType === 'Admin' && secretKey !== 'davmin') {
      alert('Invalid Admin secret');
    } else {
      fetch('http://172.20.10.5:4000/signup', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          fname: fname,
          lname: lname,
          email: email,
          password: password,
          userType: userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // Update the error message state variable
            setErrorMessage(data.error.message);
          } else {
            console.log('User Registered');
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.log('Error:', error);
          alert('Failed to register user');
        });
    }
  }

  return (
    <center>
 <form onSubmit={handleSubmit} className='form'>
      <h1>Sign Up</h1>
      {errorMessage && <p>{errorMessage}</p>}
      
      <div className='form-group'>
        <input
          type='text'
          className='sign-f'
          placeholder='First name'
          onChange={(e) => setfName(e.target.value)}
        />
      </div>

      <div className='form-group'>
        <input
          type='text'
          className='sign-l'
          placeholder='Last name'
          onChange={(e) => setlName(e.target.value)}
        />
      </div>

      <div className='form-group'>
        <input
          type='email'
          className='login-user'
          placeholder='Enter email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='form-group'>
        <input
          type='password'
          className='login-pass'
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='d-grid'>
        <button type='submit' className='btn'>
          <p>Sign Up</p>
        </button>
      </div>
      <p className='forgot-password text-right'>
        Already registered <a href='/'>sign in?</a>
      </p>
    </form>
    </center>
   
  );
}
