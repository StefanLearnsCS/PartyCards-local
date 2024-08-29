import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <div>
      <div id='footer-container'>
        <Container className='p-4'>
          <Row>
            <Col md="3">
              <div>PartyCards</div>
              <div>Create, discover, and play custom card games online—fun, social, and always ready for your next party.</div>
            </Col>
    
            <Col md="6">
              <div> Code of Conduct </div>
                <div>Respect Others: Keep the game fun and friendly.</div>
                <div>No Offensive Content: Create and share only appropriate packs.</div>
                <div>Stay Safe: Don’t share personal information.</div>
                <div>Report Issues: Contact about any inappropriate behavior or content.</div>
                <div>Have Fun: Enjoy the games and make new memories!</div>
            </Col>

            <Col md="3"> 
              <div> Useful Links </div>
              <div> Homepage </div>
              <div> Create a Pack </div>
              <div> View All Packs </div>
              <div> Creator </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Footer
