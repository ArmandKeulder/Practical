import React from 'react';
import qs from 'qs';
import ax from 'axios'
import './style.css';
import { Formik } from 'formik';

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface LogInProps {
  Username?: any;
  value?: any;
}
interface LogInState {
  Username : string,
  password : string,
  errors : {
     Username : string,
     password : string
  }
}

const handleSubmit = (values: any) => {
  console.log(values);
  var data = qs.stringify({
    'grant_type': 'password',
    'client_id': 'web-dashboard',
    'client_secret': 'SuperSecretPassword',
    'scope': 'openid profile role email offline_access adminApi mobileApi',
    'username': values.Username,
    'password': values.password, 
  });
  var config = {
    method: 'post',
    url: 'https://edeaf-api-staging.azurewebsites.net/connect/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': 'ARRAffinity=dc1a2f078f24fbe0b89216feb978960e498e28e19bd2f1012986dcb9f19bd87a; ARRAffinitySameSite=dc1a2f078f24fbe0b89216feb978960e498e28e19bd2f1012986dcb9f19bd87a'
    },
    data : data
  };
     ax(config)
        .then(function (response) {
           console.log(JSON.stringify(response.data));
           localStorage.setItem('token', response.data.access_token); 
        })
        .catch(function (error) {
           console.log(error);
        });
  }

 export class LogIn extends React.Component<LogInProps, LogInState>
 {
     constructor(props: LogInProps) {
         super(props);
         const initialState = {
          Username : '',
            password : '',
            errors : {
              Username : '',
              password : ''
            } 
          }
          this.state = initialState;
      }
 
    render() {
     const {errors} = this.state   
     return (
       <div className='wrapper'>
         <div className='form-wrapper'>
            <h2>Log In</h2>

            <Formik
              initialValues={{ Username: '', password: '' }}

              onSubmit={(values) => {
                handleSubmit(values);
            }}
     >
      {({
         values,
         errors,
         touched,
         handleChange,
         handleSubmit,
         isSubmitting,
        }) => {
          return(
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input className='username'
                type="text"
                name="Username"
                onChange={handleChange}
                value={values.Username} />

              <label>Password</label>
              <input className='password'
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password} />
              
              <button type="submit" disabled={isSubmitting}>
                Submit 
              </button>    
            
            </form>
            
            )}}
          </Formik>
            </div>
        </div>
      );
    }
}
