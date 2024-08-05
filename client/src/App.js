import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePack from './pages/CreatePack';
import Pack from './pages/Pack';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';



function App() {

  return (
      
      <div className='App'>
        <Router>
          <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary border-bottom border-white" sticky="top">
            <Container>
              <Navbar.Brand href="#home"><Link id="nav-brand" to="/"> PartyCards </Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link ><Link id="nav-link" to="/createpack"> Create a Pack</Link></Nav.Link>
                  <Nav.Link href="#link"><Link id="nav-link" to="/"> View All Packs </Link></Nav.Link>
                  <Nav.Link href="#link"><Link id="nav-link" to="/"> Instructions </Link></Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#link"><Link id="nav-link" to="/login"> Login </Link></Nav.Link>
                  <Nav.Link eventKey={2} href="#link"> <Link id="nav-link" to="/register"> Register </Link> </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/createpack" element={<CreatePack/>} />
            <Route path="/pack/:id" element={<Pack/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </Router>
      </div>
  );

}
export default App;
