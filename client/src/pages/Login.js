import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = {email: email, password: password};
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token, );
        setAuthState({username: response.data.username, id: response.data.id, status: true});
        navigate("/");
      }
    })
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const username = query.get('username');
    const id = query.get('id');
    
    if (token) {
      localStorage.setItem("accessToken", token);
      setAuthState({ username, id, status: true });
      navigate("/");
    }
  }, []);

  const googleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };  

  return (
    <Container className='col-xl-4 col-lg-6 col-md-7 rounded border border-secondary' id='create-pack-container'>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Email: </Form.Label>
          <Form.Control 
            placeholder="Email" 
            onChange={(event) => {setEmail(event.target.value);}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Password: </Form.Label>
          <Form.Control 
            placeholder="Password"
            onChange={(event) => {setPassword(event.target.value);}}
            type="password" />
        </Form.Group>
        <Button variant="primary" onClick={login} id="create-pack-button"> Login </Button>
        <Button variant="primary" onClick={googleLogin} id="create-pack-button"> Google Login </Button>
      </Form>
    </Container>
  )
}

export default Login
