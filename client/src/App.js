import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function App() {

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
      <Container className='col-xl-9'>
        <Container className='d-flex justify-content-center flex-wrap'>
          {listOfPosts.map((value, key) => {
            return (
            <Card className="card-pack-display" bg="info" border='dark'>
              <Card.Header> {value.title} </Card.Header>
              <Card.Body>
                <Card.Subtitle> Creator: {value.username} </Card.Subtitle>
                <Card.Text> {value.postText} </Card.Text>
              </Card.Body>
            </Card>
            );
        })} 
        </Container>
      </Container>
  );

}
export default App;
