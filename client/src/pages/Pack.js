import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Carousel, InputGroup, Form, Button, Card, Pagination} from 'react-bootstrap';
import CardBG from '../images/card-bg.jpg';

function Pack() {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({});
    const [cards, setCards] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("")
    const [charCount, setCharCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 4;
    const MAX_CHAR_LIMIT = 100;

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/cards/${id}`).then((response) => {
            setCards(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });

    }, []);

    const handleCommentChange = (event) => {
        const comment = event.target.value;
        if (comment.length <= MAX_CHAR_LIMIT) {
            setNewComment(comment);
            setCharCount(comment.length);
        }
    };

    const addComment = () => {
        if (newComment.trim() === "") {
            return;
        }
        
        axios.post("http://localhost:3001/comments", {commentText: newComment, packId: id, username: "Steve"}).then((response) => {
            const commentToAdd = {commentText: newComment};
            setComments([...comments, commentToAdd]);
            setNewComment("");
            setCharCount(0);
            setCurrentPage(Math.ceil((comments.length + 1) / commentsPerPage));
        })
    };

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
    <div className='inpack-container'>
        <Container>
                <div id="inpack-text-title" className='fs-1'>{postObject.title} </div>
                
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={6}>
                    <Carousel data-bs-theme="dark" className='rounded border border-black' interval={null}>
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
                <Col md={10} lg={6} xl={6} id="inpack-comments-container" className='rounded border border-secondary d-flex flex-column justify-content-between'>
                    <div id="inpack-text-comments-header">Share Your Funny Stories:</div>
                    <div id="inpack-text-comments-add" className='fs-6'> 
                        <InputGroup>
                            <Form.Control
                                placeholder="Comment..."
                                type="text"
                                value={newComment}
                                autoComplete='off'
                                onChange={handleCommentChange}
                                style={{ margin: '0'}}
                            />
                            <Button variant="primary" onClick={addComment} disabled={newComment.trim() === "" || newComment.length > MAX_CHAR_LIMIT}>
                                Add Comment
                            </Button>
                        </InputGroup>
                        <div className='comment-charcount-container'>
                            <div className='inpack-text-comment-charcount'>
                                {charCount}/{MAX_CHAR_LIMIT} characters
                            </div>
                        </div>
                    </div>
                    {currentComments.map((card, key) => {
                        return <div id="inpack-text-comments" className='fs-6' key={key}> 
                            <Card id="inpack-text-comments-card" bg="white" border="secondary">
                                <Card.Body>
                                    <Card.Text id="inpack-text-comments-card-text">
                                        {card.commentText}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    })}
                    <Pagination className="mt-3">
                        {Array.from({ length: Math.ceil(comments.length / commentsPerPage) }, (_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Pack
