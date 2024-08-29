import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Carousel, InputGroup, Form, Button, Card, Pagination} from 'react-bootstrap';
import CardBG from '../images/card-bg.jpg';
import { AuthContext } from '../helpers/AuthContext'; 
import ProfileAva from '../images/profileava.jpg'

function Pack() {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({});
    const [cards, setCards] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("")
    const [charCount, setCharCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 4;
    const MAX_CHAR_LIMIT = 150;
    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

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
        
        axios.post("http://localhost:3001/comments", {commentText: newComment, packId: id},
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                const commentToAdd = {commentText: response.data.commentText, username: response.data.username, id: response.data.id};
                setComments([...comments, commentToAdd]);
                setNewComment("");
                setCharCount(0);
                setCurrentPage(Math.ceil((comments.length + 1) / commentsPerPage));
            }
            
        })
    };

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {headers: { accessToken: localStorage.getItem('accessToken')}
        }).then(() => {
            setComments(comments.filter((val) => {
                return val.id != id;
            }));
        });
    };

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`, {headers: { accessToken: localStorage.getItem('accessToken')}}
        ).then(() => {
            navigate("/")
        })
    }

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const shuffleCards = () => {
        setCards(shuffleArray(cards));
    };


    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
    <div className='inpack-container'>
        <Container>
            <div id="inpack-text-title" className='fs-1 text-uppercase'>{postObject.title} </div>
                
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={6}>
                    <Carousel id="inpack-carousel" data-bs-theme="dark" className='rounded border border-black' interval={null}>
                        {cards.map((card, key) => {
                            return <Carousel.Item key={key}>
                                <img src={CardBG} alt="First slide" className="d-block w-100 rounded" />
                                <Carousel.Caption id="inpack-carousel-text">
                                    <p> {card.prompt} </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        })}
                    </Carousel>
                    <Button onClick={shuffleCards} className='btn-warning m-3'> Shuffle Pack </Button>
                    {authState.username === postObject.username && <Button onClick={() => {deletePost(postObject.id)}} className='btn-danger m-3'> Delete Pack </Button>}
                </Col>
                <Col md={10} lg={6} xl={6} id="inpack-comments-container" className='border border-black d-flex flex-column justify-content-between'>
                    <div id="inpack-text-comments-add" className='fs-6'> 
                        <InputGroup className='mt-4 shadow'>
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
                        <hr></hr>

                        <Pagination className="mt-1">
                            {Array.from({ length: Math.ceil(comments.length / commentsPerPage) }, (_, index) => (
                                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                    {currentComments.map((card, key) => {
                        return <div id="inpack-text-comments" className='fs-6' key={key}> 
                            <Card id="inpack-text-comments-card" bg="white" border="secondary">
                                <Card.Body style={{padding: "0"}}>
                                    <Row>
                                        <Col xl="2" lg="3" md="2" xs="2">
                                            <img 
                                            src={ProfileAva}
                                            className="d-block w-100 rounded" />
                                        </Col>
                                        <Col xl="10" lg="9" md="10" xs="10">
                                            <Row  className="d-flex align-items-center justify-content-between">
                                                <Col xl="10" lg="9" md="10" xs="9" id="inpack-text-comments-card-username">@{card.username}</Col>
                                                <Col>
                                                    {authState.username === card.username && (
                                                        <div
                                                            id="inpack-text-comments-card-username" 
                                                            onClick={() => deleteComment(card.id)} 
                                                            style={{ cursor: 'pointer', color: 'red' }}>
                                                            Delete
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row style={{marginRight: "1px"}}>
                                                <p id="inpack-text-comments-card-text">{card.commentText}</p>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    })}
                    
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Pack
