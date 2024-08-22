import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import FunWithFriends from "../images/fun-with-friends.jpg"
import CreatePackImg from "../images/createpackimg.jpg"
import UserCreatedPacksImg from "../images/usercreatedpacks.jpg"
import InGameImg from "../images/ingameimg.jpg"

function Home() {
  return (
    <div>
      
        <Container id="home-container-1" className="d-flex justify-content-center align-items-center">
          <Row className='justify-content-center'>
            <Col xl="5" lg="6" md="12">
              <h1 id='home-header'> Unleash the Fun: Create and Discover Party Games Instantly with <span id='home-highlighted-text'>PartyCards</span></h1>
              <h5 id='home-subtext'> 
                Whether you're looking to create your own unique game or explore packs 
                made by others, PartyCards has you covered. No more fumbling with real cards—everything you need is right here, ready to bring the 
                fun to your next event! 
              </h5>
              <Button size='lg' variant="light" id="home-play-btn" className='rounded-5'> Play Now </Button>
            </Col>
            <Col xl="5" lg="6" md="7" className='mt-2'>
              <img src={FunWithFriends} alt="Two friends laughing playing party cards" id='home-header-image' className="d-block w-100 rounded-4" />
            </Col>
          </Row>
        </Container>
      
      
        <Container id="home-container-2" className="justify-content-center align-items-center">
          <Row className='border border-black'>
            <Col xl="6">
              <h2 id='home-header' > Create and Share Your Own Deck of Party Cards</h2>
            </Col>
            <Col id="home-image-col" xl="6">
              <img 
                src={CreatePackImg} 
                alt="Interface to create your own packs on PartyCards" 
                id='home-accessory-image' 
                className="d-block w-100" 
              />
            </Col>
          </Row>
          <Row>
            <Col id="home-image-col" xl="6">
              <img 
                src={InGameImg} 
                alt="Interface to look at other players' packs on PartyCards" 
                id='home-accessory-image' 
                className="d-block w-100" 
              />
            </Col>
            <Col xl="6">
              <h2 id='home-header' > Quickly Find a Party Game on Any Device From Any Location </h2>
            </Col>
          </Row>
          <Row className='border border-black'>
            <Col xl="6">
              <h2 id='home-header' > Search Through Recently Created, Top Rated and Most Played PartyCard Packs </h2>
            </Col>
            <Col id="home-image-col" xl="6">
              <img 
                src={UserCreatedPacksImg} 
                alt="In game screen shot of PartyCards pack" 
                id='home-accessory-image' 
                className="d-block w-100" 
              />
            </Col>
          </Row>
        </Container>
      
    </div>
  )
}

export default Home
