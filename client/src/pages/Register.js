import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Container, Button, Form as BootstrapForm, Alert} from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {

  const [backendError, setBackendError] = useState(null);

  let navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username cannot exceed 15 characters")
      .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
      .required("Username is required"),
    
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    
    password: Yup.string()
      .min(8, "Password must be at least 8 characters") // Increased minimum length for better security
      .max(20, "Password cannot exceed 20 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Requires at least one uppercase letter
      .matches(/[a-z]/, "Password must contain at least one lowercase letter") // Requires at least one lowercase letter
      .matches(/[0-9]/, "Password must contain at least one number") // Requires at least one number
      .matches(/[@$!%*?&]/, "Password must contain at least one special character") // Requires at least one special character
      .required("Password is required"),
    
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm Password is required"),
  });

  const BootstrapField = ({ field, form: { touched, errors }, ...props }) => (
      <BootstrapForm.Group controlId={field.name}>
          <BootstrapForm.Label>{props.label}</BootstrapForm.Label>
          <BootstrapForm.Control
              {...field}
              {...props}
              isInvalid={touched[field.name] && errors[field.name]}
          />
          <ErrorMessage name={field.name} component="div" className="invalid-feedback" />
      </BootstrapForm.Group>
  );

  const onSubmit = async (data, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    setBackendError(null);
  
    try {
      const response = await axios.post("http://localhost:3001/auth", data);
  
      if (response.data.error) {
        setBackendError(response.data.error);
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setBackendError(error.response.data.error);
      } else {
        setBackendError("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };  


  return (
    <Container className='col-xl-4 col-lg-6 col-md-7 rounded border border-secondary' id='create-pack-container'>
      <p id='register-text'> Create your <span id='home-highlighted-text'>PartyCards</span> account. It’s free and only takes a minute! </p>
      <p id='register-subtext'> Already have an account? <Link to="/login">Login Here!</Link></p>
      <div className="d-flex justify-content-center mb-3 mt-4">
        <button className="google-btn d-flex align-items-center" onClick={googleLogin}>
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo"/>
          <span>Continue with Google</span>
        </button>
      </div>
      
      <div className="d-flex align-items-center mb-3">
        <hr className="flex-grow-1" />
        <span className="mx-2">or</span>
        <hr className="flex-grow-1" />
      </div>

      {backendError && <Alert variant="danger">{backendError}</Alert>}
      <Formik 
          initialValues={initialValues} 
          onSubmit={onSubmit} 
          validationSchema={validationSchema} 
          validateOnChange={true} 
          validateOnBlur={true}
      >
        <Form>
          <Field
            name="username"
            type="text"
            label="Display Name:"
            placeholder="Display Name"
            component={BootstrapField}
          />
          <Field
            name="email"
            type="email"
            label="Email:"
            placeholder="Email"
            component={BootstrapField}
          />
          <Field
            name="password"
            type="password"
            label="Password:"
            placeholder="Password"
            component={BootstrapField}
          />
          <Field
            name="confirmPassword"
            type="password"
            label="Confirm Password:"
            placeholder="Confirm Password"
            component={BootstrapField}
          />

          <Button variant="primary" type="submit" id="create-pack-button"> Register </Button>
        </Form>
      </Formik>             
    </Container>
  )
}

export default Register
