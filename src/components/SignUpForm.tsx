import React from "react";
import qs from 'qs';
import ax from 'axios'
import './style.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Formik } from 'formik';

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignUpProps {
   name?: any;
   value?: any;
}

interface SignUpState {
   username: string,
   email: string,
   surname: string,
   errors: {
      username: string,
      email: string,
      surname: string
   }
}

var data = {
   "name": "string",
   "surname": "string",
   "email": "string",
   "role": "Administrator"
 };
var configcreate = {
   method: 'post',
   url: 'https://edeaf-api-staging.azurewebsites.net/v1/admin/Users',
   headers: {
      'Content-Type': 'application/json',
      'Cookie': 'ARRAffinity=dc1a2f078f24fbe0b89216feb978960e498e28e19bd2f1012986dcb9f19bd87a; ARRAffinitySameSite=dc1a2f078f24fbe0b89216feb978960e498e28e19bd2f1012986dcb9f19bd87a'
   },
   data: data
};

export class SignUp extends React.Component<SignUpProps, SignUpState>
{
   handleChange = (event: any) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
      switch (name) {
         case 'username':
            errors.username = value.length < 5 ? 'Username must be 5 characters long!' : '';
            break;
         case 'email':
            errors.email = Regex.test(value) ? '' : 'Email is not valid!';
            break;
         case 'surname':
            errors.surname = value.length < 8 ? 'surname must be eight characters long!' : '';
            break;
         default:
            break;
      }
      this.setState(Object.assign(this.state, { errors, [name]: value }));
      console.log(this.state.errors);
   }

   handleSubmit = (values: any) => {
      console.log(values)
      //values.preventDefault();
      let validity = true;
      Object.values(this.state.errors).forEach(
         (val) => val.length > 0 && (validity = false)
      );
      if (validity == true) {
         console.log("Registering can be done");
         configcreate.data.name = values.username
         configcreate.data.surname = values.surename
         configcreate.data.email = values.email
         ax(configcreate)
            .then(function (response) {
               console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
               console.log(error);
            });
      } else {
         console.log("You cannot be registered!!!")
      }
   }
   constructor(props: SignUpProps) {
      super(props);
      const initialState = {
         username: '',
         email: '',
         surname: '',
         errors: {
            username: '',
            email: '',
            surname: ''
         }
      }
      this.state = initialState;
      this.handleChange = this.handleChange.bind(this);
   }

   render() {
      const { errors } = this.state
      return (
         <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Sign Up</h2>
      <Formik
       initialValues={{ email: '', firstname: '', surname: '' }}
      //  validate={values => {
      //    const errors = {email: '', firstname: '', surname: '' };
      //    console.log('Name')
      //    if (!values.email) {
      //      errors.email = 'Required';
      //      errors.firstname = 'Required';
      //      errors.surname = 'Required';
      //    } else if (
      //      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      //    ) {
      //      errors.email = 'Invalid email address';
      //    }
      //    return errors;
      //  }}
       onSubmit={(values) => {
         console.log('tester')
         this.handleSubmit(values);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => {
         console.log(values);
         return(
         <form onSubmit={handleSubmit}>
            <label>First name</label>
            <input className = 'username'
             type="text"
             name="firstname"
             onChange={handleChange}
             value={values.firstname}
           />
            <label>Surname</label>
            <input className = 'password'
             type="text"
             name="surname"
             onChange={handleChange}
             value={values.surname}
           />
            <label>Email Adress</label>
            <input className = 'email'
             type="email"
             name="email"
             onChange={handleChange}
             value={values.email}
            />
           {errors.email && touched.email && errors.email}

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
