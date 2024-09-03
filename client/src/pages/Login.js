import React from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);
  const [backendError, setBackendError] = useState(null);

  let navigate = useNavigate();

  const login = () => {
    const data = {email: email, password: password};
    axios.post("https://partycards-api-e307a5481398.herokuapp.com/auth/login", data).then((response) => {
      if (response.data.error) {
        setBackendError(response.data.error);
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
    window.location.href = "https://partycards-api-e307a5481398.herokuapp.com/auth/google";
  };  

  return (
    <Container className='col-xl-4 col-lg-6 col-md-7 rounded border border-secondary' id='create-pack-container'>
      <p id='register-text'> Welcome back to <span id='home-highlighted-text'>PartyCards</span>! Login here to continue the fun! </p>
      <p id='register-subtext'> Still need to create an account? <Link to="/register">Register Here!</Link></p>
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
      <Form>
        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
          <Form.Label> Email: </Form.Label>
          <Form.Control 
            type='email'
            placeholder="Email" 
            onChange={(event) => {setEmail(event.target.value);}}/>
        </Form.Group>
        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
          <Form.Label> Password: </Form.Label>
          <Form.Control 
            placeholder="Password"
            onChange={(event) => {setPassword(event.target.value);}}
            type="password" />
        </Form.Group>
        <Button variant="primary" onClick={login} id="create-pack-button"> Login </Button>
      </Form>
    </Container>
  )
}

export default Login
