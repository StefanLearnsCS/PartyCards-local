import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Carousel} from 'react-bootstrap';
import CardBG from '../images/card-bg.jpg';

function Pack() {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/cards/${id}`).then((response) => {
            setCards(response.data);
        });
    }, []);

    return (
    <div className='inpack-container'>
        <Container>
            <div id="inpack-text" className='fs-1'>{postObject.title}</div>
            <div id="inpack-text" className='fs-4'>{postObject.postText}</div>
            <div id="inpack-text" className='fs-6'>Card Pack Created By: {postObject.username}</div>
            <Row>
                <Col xl={6}>
                    <Carousel data-bs-theme="dark" className='rounded border border-black'>
                        {cards.map((card, key) => {
                            return <Carousel.Item key={key}>
                                <img src={CardBG} alt="First slide" className="d-block w-100 rounded" />
                                <Carousel.Caption id="inpack-carousel-text">
                                    <h3> {card.prompt} </h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        })}
                    </Carousel>
                </Col>
                <Col xl={6} id="inpack-comments-container" className='rounded border border-secondary'>
                    <div id="inpack-text-comments" className='fs-1'>Share Your funny Stories:</div>
                    <div id="inpack-text-comments" className='fs-6'>Comments Here</div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Pack
