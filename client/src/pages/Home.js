import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap'
import FunWithFriends from "../images/fun-with-friends.jpg"
import CreatePackImg from "../images/createpackimg.jpg"
import UserCreatedPacksImg from "../images/usercreatedpacks.jpg"
import InGameImg from "../images/ingameimg.jpg"
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios'

function Home() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeyPot, setHoneyPot] = useState("");

  const [blurState, setBlurState] = useState({
    firstRow: true,
    secondRow: true,
    thirdRow: true,
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const contact = () => {
    if (!firstName || !lastName || !email || !message) {
      alert('All fields are required.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const data = { firstName, lastName, email, message, honeyPot };
    axios.post("http://localhost:3001/contact", data)
      .then(() => {
        alert('Message sent successfully! We will get back to you as soon as possible!');
      })
      .catch((error) => {
        alert('Error sending message. Please try again later.');
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      const firstRow = document.getElementById('first-row');
      const secondRow = document.getElementById('second-row');
      const thirdRow = document.getElementById('third-row');

      const firstRowBottom = firstRow.getBoundingClientRect().bottom;
      const secondRowBottom = secondRow.getBoundingClientRect().bottom;
      const thirdRowBottom = thirdRow.getBoundingClientRect().bottom;

      const windowHeight = window.innerHeight;

      setBlurState({
        firstRow: firstRowBottom > windowHeight || firstRowBottom < 0,
        secondRow: secondRowBottom > windowHeight || secondRowBottom < 0,
        thirdRow: thirdRowBottom > windowHeight || thirdRowBottom < 0,
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div>
        <Container id="home-container-1" className="d-flex justify-content-center align-items-center">
          <Row className='justify-content-center'>
            <Col xl="5" lg="6" md="12">
              <h1 id='home-header'> Unleash the Fun: Create and Discover Free Party Games Instantly with <span id='home-highlighted-text'>PartyCards</span></h1>
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
          <Row id="first-row" className={`border border-black ${blurState.firstRow ? 'blur' : ''}`}>
            <Col xl="6" lg="6" className='d-flex flex-column justify-content-center align-items-center'>
              <h2 id='home-header' > Create and Share Your Own Deck of Party Cards</h2>
              <h5 id='home-subtext-col'> 
                Let your creativity shine by designing custom card packs that match your unique party style. 
                Share your creations with friends or the entire PartyCards community, and watch your deck become a hit!
              </h5>
            </Col>
            <Col id="home-image-col" xl="6" lg="6">
              <img 
                src={CreatePackImg} 
                alt="Interface to create your own packs on PartyCards" 
                id='home-accessory-image' 
                className="d-block w-100" 
              />
            </Col>
          </Row>
          <Row id="second-row" className={`${blurState.secondRow ? 'blur' : ''}`}>
            <Col id="home-image-col" className="order-lg-1 order-2" xl="6" lg="6">
              <img 
                src={InGameImg} 
                alt="Interface to look at other players' packs on PartyCards" 
                id='home-accessory-image' 
                className="d-block w-100" 
              />
            </Col>
            <Col xl="6" lg="6" className='d-flex flex-column justify-content-center align-items-center order-lg-2 order-1'>
              <h2 id='home-header' > Quickly Find a Party Game on Any Device From Any Location </h2>
              <h5 id='home-subtext-col'> 
                With PartyCards, the fun is always at your fingertips. Whether you're at home, on the go, or at a friend's place, 
                access a wide variety of games instantly from any device, no app downloads required.
              </h5>
            </Col>
          </Row>
          <Row id="third-row" className={`border border-black ${blurState.thirdRow ? 'blur' : ''}`}>
            <Col xl="6" lg="6" className='d-flex flex-column justify-content-center align-items-center'>
              <h2 id='home-header' > Search Through Recently Created, Top Rated and Most Played PartyCard Packs </h2>
              <h5 id='home-subtext-col'> 
               Discover the latest and greatest party games created by players just like you. 
               Browse trending packs, top-rated decks, and the most popular games to keep your party entertained for hours.
              </h5>
            </Col>
            <Col id="home-image-col" xl="6" lg="6">
              <img 
                src={UserCreatedPacksImg} 
                alt="In game screen shot of PartyCards pack" 
                id='home-accessory-image' 
                className="d-block w-100" 
              />
            </Col>
          </Row>
        </Container>
        <Container id="contact-container">
          <h2 id='contact-header'>Reach out to <span id='home-highlighted-text'>PartyCards</span> directly:</h2>
          <h5 id='home-subtext-col'>
            We'd love to hear from you! Whether you have questions, feedback, or just want to share your thoughts, drop us a message below and we'll get back to you as soon as possible.
          </h5>
          <Row className='g-2 mt-4'>
            <Col>
              <FloatingLabel controlId="floatingInputGrid" label="First Name">
                <Form.Control 
                type="text" 
                placeholder="John"
                onChange={(event) => {setFirstName(event.target.value);}} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInputGrid" label="Last Name">
                <Form.Control 
                type="text" 
                placeholder="Doe" 
                onChange={(event) => {setLastName(event.target.value);}}/>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="g-2 mt-2">
            <FloatingLabel controlId="floatingInputGrid" label="Email address">
              <Form.Control 
              type="email" 
              placeholder="name@example.com" 
              onChange={(event) => {setEmail(event.target.value);}}/>
            </FloatingLabel>
          </Row>
          <Row className="g-2 mt-2">
            <FloatingLabel controlId="floatingTextarea2" label="Your Message">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                onChange={(event) => {setMessage(event.target.value);}}
              />
            </FloatingLabel>
            <Form.Control //SPAM DETECTION
                type="text" 
                placeholder="Do not fill this out" 
                style={{ display: 'none' }} 
                value={honeyPot} 
                onChange={(event) => setHoneyPot(event.target.value)} 
            />
          </Row>
          <Button size='md' variant="light" id="home-play-btn" className='mt-4 rounded-5' onClick={contact}> Send Message </Button>
        </Container>
        <Container>
          Footer
        </Container>
    </div>
  )
}

export default Home
