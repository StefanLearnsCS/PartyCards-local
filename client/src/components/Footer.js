import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <div>
      <div id='footer-container'>
        <Container className='p-4'>
          <Row>
            <Col md="3" id="footer-col">
              <div id="footer-header">PartyCards</div>
              <div id='footer-text'>Create, discover, and play custom card party games online—fun, social, and always ready for your next party.</div>
            </Col>
    
            <Col md="6" id="footer-col">
              <div id="footer-header"> Code of Conduct </div>
                <div id='footer-text'><span id='footer-text-highlight'>Respect Others: </span>Keep the game fun and friendly.</div>
                <div id='footer-text'><span id='footer-text-highlight'>No Offensive Content: </span>Create and share only appropriate packs.</div>
                <div id='footer-text'><span id='footer-text-highlight'>Stay Safe: </span>Don't share personal information.</div>
                <div id='footer-text'><span id='footer-text-highlight'>Report Issues: </span>Contact about any inappropriate behavior or content.</div>
                <div id='footer-text'><span id='footer-text-highlight'>Have Fun: </span>Enjoy the games and make new memories!</div>
            </Col>

            <Col md="3" id="footer-col"> 
              <div id="footer-header"> Useful Links </div>
              <div id='footer-text'><a href="/">Homepage</a></div>
              <div id='footer-text'><a href="/createpack">Create a Pack</a></div>
              <div id='footer-text'><a href="/play">View all Packs</a></div>
              <div id='footer-text'><a href="https://www.linkedin.com/in/stefan-ilic-engineering/">Creator</a></div>
            </Col>
          </Row>
          <hr></hr>
          <div id='footer-text'> <a href="https://www.linkedin.com/in/stefan-ilic-engineering/">PartyCards Designed and Developed by: Stefan Ilic </a></div>
        </Container>
      </div>
    </div>
  )
}

export default Footer
