import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePack from './pages/CreatePack';

function App() {

  return (
      <div className='App'>
        <Router>
          <Link to="/createpack"> Create a Pack</Link>
          <Link to="/"> Home </Link>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/createpack" element={<CreatePack/>} />
          </Routes>
        </Router>
      </div>
  );

}
export default App;
