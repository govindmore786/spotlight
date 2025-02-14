// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";
import "./App.css";
import Carousel from "./Carousel";
import Review from "./Review";
import Login from "./Login";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <Main />
      </Router>
    </AppProvider>
  );
}
function Main() {
  const navigate = useNavigate(); // useNavigate hook to handle navigation
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;

  useEffect(() => {
    // Dynamically adjust padding-right to account for scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);
  useEffect(() => {
    // Redirect to /home when the page is loaded or reloaded
    if (window.location.pathname !== '/home') {
      navigate("/home");
    }
  }, []);
  return (
    <div>
      {/* Navigation Menu */}
      <div className="nav">
        <ul className="menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
       
          <li className="dropdown">
        <a href="#home" data-bs-toggle="dropdown" aria-expanded="false">Places</a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
    </li>
    <li>
            <Link to="/review">Write a review</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </div>

      <div className="content">
      <Routes>
        <Route path="/home" element={<Carousel/>} />
        <Route path="/review" element={<Review />} />
        <Route path="/write-rev" element={<Carousel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </div>
  );
}


export default App;
