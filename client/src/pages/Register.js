import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Container, Button, Form as BootstrapForm} from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Register() {

  let navigate = useNavigate();

  const initialValues = {
    username:"",
    password:""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
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

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
      navigate("/");
    })
  };

  return (
    <Container className='col-xl-4 col-lg-6 col-md-7 rounded border border-secondary' id='create-pack-container'>
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
                  label="Username:"
                  placeholder="Username"
                  component={BootstrapField}
              />
              <Field
                  name="password"
                  type="password"
                  label="Password:"
                  placeholder="Password"
                  component={BootstrapField}
              />

              <Button variant="primary" type="submit" id="create-pack-button"> Register </Button>
          </Form>
      </Formik>             
    </Container>
  )
}

export default Register
