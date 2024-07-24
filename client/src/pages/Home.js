import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      <Container className='col-xl-9'>
        <Container className='d-flex justify-content-center flex-wrap'>
          {listOfPosts.map((value, key) => {
            return (
            <Card text="black "className="card-pack-display" bg="white" border='black' onClick={() => {navigate(`/pack/${value.id}`)}}>
              <Card.Header> {value.title} </Card.Header>
              <Card.Body>
                <Card.Text id='card-pack-description'> {value.postText} </Card.Text>
                <hr></hr>
                <Card.Text id='card-pack-accessory'> Total Plays: {value.clickCount} </Card.Text>
                <Card.Text id='card-pack-accessory'> Rating: </Card.Text>
                <Card.Subtitle id='card-pack-accessory'> Created by: {value.username} </Card.Subtitle>
              </Card.Body>
            </Card>
            );
        })} 
        </Container>
      </Container>
    </div>
  )
}

export default Home
