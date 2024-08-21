import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import FunWithFriends from "../images/fun-with-friends.jpg"

function Home() {
  return (
    <div>
      <Container id="home-container-1" className="d-flex justify-content-center align-items-center">
        <Row className='justify-content-center'>
          <Col xs lg="5">
            <img src={FunWithFriends} alt="Two friends laughing playing party cards" id='home-header-image' className="d-block w-100 rounded-4" />
          </Col>
          <Col xs lg="5">
            <h1 id='home-header'> Unleash the Fun: Create and Discover Party Games Instantly with <span id='home-highlighted-text'>PartyCards</span></h1>
            <h5 id='home-subtext'> 
              Whether you're looking to create your own unique game or explore packs 
              made by others, PartyCards has you covered. No more fumbling with real cards—everything you need is right here, ready to bring the 
              fun to your next event! 
            </h5>
            <Button size='lg' variant="light" id="home-play-btn" className='rounded-5'> Play Now </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
