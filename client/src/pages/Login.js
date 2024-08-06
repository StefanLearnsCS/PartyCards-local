import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from "axios";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
    })
  };

  return (
    <Container className='col-xl-4 col-lg-6 col-md-7 rounded border border-secondary' id='create-pack-container'>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Username </Form.Label>
          <Form.Control 
            placeholder="Username" 
            onChange={(event) => {setUsername(event.target.value);}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Password </Form.Label>
          <Form.Control 
            placeholder="Password"
            onChange={(event) => {setPassword(event.target.value);}} />
        </Form.Group>
        <Button variant="primary" onClick={login} id="create-pack-button"> Login </Button>
      </Form>
    </Container>
  )
}

export default Login
