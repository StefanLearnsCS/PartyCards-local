import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { Pagination, Nav } from 'react-bootstrap';

function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([]);
    const [userLikedPosts, setUserLikedPosts] = useState([]);
    const { authState, setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [packPerPage, setPackPerPage] = useState(4);
    const [activeTab, setActiveTab] = useState("user");


    let navigate = useNavigate()

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setPackPerPage(4);
        } else if (window.innerWidth <= 1440) {
          setPackPerPage(4);
        } else {
          setPackPerPage(4);
        }
      };
  
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

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

    axios.get(`http://localhost:3001/posts/byUserId/${id}`, 
      { headers: {accessToken: localStorage.getItem("accessToken")}})
      .then((response) => {
        setListOfPosts(response.data.listOfPosts || []);
        setLikedPosts((response.data.likedPosts || []).map((like) => like.PostId));
        setUserLikedPosts(response.data.userLikedPosts || []);
        setLoading(false);
      }).catch(() => {
        setListOfPosts([]);
        setLikedPosts([]);
        setUserLikedPosts([]);
        setLoading(false);
      });

        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })
        
    }, [])

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
    const currentUserLikedPacks = userLikedPosts.slice(indexOfFirstPack, indexOfLastPack);
      
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading message or spinner
    }

    return (
      <div>
      <h1 id='home-header' className='mt-2'> {username}'s Party Page </h1>
      <Container id='card-pack-container' className='mb-5 col-xl-9 d-flex justify-content-center flex-wrap'>
      <Nav variant="pills" data-bs-theme="dark" className="mt-2 bg-secondary rounded border" defaultActiveKey="played">
        <Nav.Item>
          <Nav.Link 
            className='text-black' 
            eventKey="user" 
            active={activeTab === "user"}
            onClick={() => {setActiveTab("user"); setCurrentPage(1);}}
          >
            Creator Packs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            className='text-black' 
            eventKey="liked"
            active={activeTab === "liked"}
            onClick={() => {setActiveTab("liked"); setCurrentPage(1);}}
          >
            Liked Packs
          </Nav.Link>
        </Nav.Item>
      </Nav>
        <Container className='d-flex justify-content-center flex-wrap'>
          {(activeTab === "user" ? currentPacks : currentUserLikedPacks).map((value, key) => {
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
            {Array.from({ length: Math.ceil((activeTab === "user" ? listOfPosts : userLikedPosts).length / packPerPage) }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </Pagination.Item>
            ))}
        </Pagination>
      </Container>
        </div>
    )
}

export default Profile
