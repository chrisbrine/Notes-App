import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Header from '../Header';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  onSubmit = (e) => {
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    e.preventDefault();

    Meteor.loginWithPassword(
      {
        email,
      }
    ,
      password
    ,
      (err) => {
        if (err) {
          this.setState({
            error: 'Unable to login. Please check your email and password.',
          });
        } else {
          this.setState({
            error: '',
          });
        }
      }
    );
  }
  render() {
    return (
      <div className='login'>

        <Header />

        <div className='boxed-view'>

          <div className='boxed-view__box'>

            {this.state.error
              ?
              (
                <p className='login__error'>{this.state.error}</p>
              )
              : null
            }

            <form onSubmit={this.onSubmit} noValidate className='login__form'>
              <input type='email' ref='email' name='email' placeholder='Email' />
              <input type='password' ref='password' name='password' placeholder='Password' />
              <button className='button'>Login</button>
            </form>

            <Link to='/signup' className='login__link'>Wish to sign up for an account? Click here.</Link>

          </div>
        </div>
      </div>
    );
  }
}

export default Login;
