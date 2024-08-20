import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { Pagination } from 'react-bootstrap';

function Play() {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const packPerPage = 4;

  let navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    }

    axios.get("http://localhost:3001/auth/auth", { 
      headers: { accessToken } 
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
        navigate("/login")
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
      setLoading(false);
    }).catch(() => {
      navigate("/login");
      setLoading(false);
    });

    axios.get("http://localhost:3001/posts", 
      { headers: {accessToken: localStorage.getItem("accessToken")}})
      .then((response) => {
        setListOfPosts(response.data.listOfPosts || []);
        setLikedPosts((response.data.likedPosts || []).map((like) => like.PostId));
        setLoading(false);
      }).catch(() => {
        setListOfPosts([]);
        setLikedPosts([]);
        setLoading(false);
      });
  }, []);

  const likeAPost = (postId, event) => {
    event.stopPropagation(); 
    axios.post("http://localhost:3001/likes", 
      { PostId: postId}, 
      { headers: {accessToken: localStorage.getItem("accessToken")}}
    ).then((response) => {
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.liked) {
            return {...post, Likes: [...post.Likes, 0]};
          } else {
              const likesArray = post.Likes
              likesArray.pop()
              return {...post, Likes: likesArray};
          }
        } else {
          return post;
        }
      }));

      if (likedPosts.includes(postId)) {
        setLikedPosts(likedPosts.filter((id) => {
          return id != postId;
        }));
      } else {
        setLikedPosts([...likedPosts, postId]);
      }
    });
  };

  const indexOfLastPack = currentPage * packPerPage;
  const indexOfFirstPack = indexOfLastPack - packPerPage;
  const currentPacks = listOfPosts.slice(indexOfFirstPack, indexOfLastPack);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <div>
      <Container id='card-pack-container' className='col-xl-9'>
        <h2 id='card-pack-header'> Recently Created Packs: </h2>
        <Container className='d-flex justify-content-center flex-wrap'>
            
          {currentPacks.map((value, key) => {
            return (
            <Card text="black "className="card-pack-display" bg="white" border='black' onClick={() => {navigate(`/pack/${value.id}`)}}>
              <Card.Header id='card-pack-title'> {value.title} </Card.Header>
              <Card.Body>
                <Card.Text id='card-pack-description'> {value.postText} </Card.Text>
                <hr></hr>
                <Card.Text id='card-pack-accessory' style={{fontWeight:"500"}}> Total Plays: {value.clickCount} </Card.Text>
                <Card.Text id='card-pack-accessory'> <label>Fun Meter: {value.Likes.length} Funs</label></Card.Text>
                <Card.Subtitle id='card-pack-accessory'><Link to={`/profile/${value.UserId}`} onClick={(e) => e.stopPropagation()}> Creator: {value.username}</Link> </Card.Subtitle>
                <Card.Text id='card-pack-accessory' style={{marginTop: ".3rem"}}><button onClick={(event) => {likeAPost(value.id, event)}} id={likedPosts.includes(value.id) ? "card-pack-likebtn-liked" : "card-pack-likebtn"}> <i class="fa-solid fa-heart"></i> Fun! </button></Card.Text>
              </Card.Body>
            </Card>
            );
        })} 
        </Container>
        <Pagination className="mt-1">
            {Array.from({ length: Math.ceil(listOfPosts.length / packPerPage) }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </Pagination.Item>
            ))}
        </Pagination>
      </Container>
    </div>
  )
}

export default Play
