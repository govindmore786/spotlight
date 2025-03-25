import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Carousel from "./Carousel";
import Review from "./Review";
import Login from "./Login";
import { AppProvider } from "./AppContext";
import { LoginProvider } from "./LoginContext";

function App() {
  return (
    <AppProvider>
      <LoginProvider>
        <Router>
          <Main />
        </Router>
      </LoginProvider>
    </AppProvider>
  );
}

function Main() {
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  // Dynamically adjust padding-right to account for scrollbar width
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  // Redirect to /home when the page is loaded or reloaded
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log("Current Path:", currentPath); // Debugging
    if (currentPath === "/") {
      console.log("Redirecting to /home"); // Debugging
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      {/* Navigation Menu */}
      <div className="nav">
        <ul className="menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li className="dropdown">
            <a href="#home" data-bs-toggle="dropdown" aria-expanded="false">
              Places
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/review1">Write a review</Link>
          </li>
          <li>
            <Link to="/login">Sign Up</Link>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="content">
        <Routes>
          <Route path="/home" element={<Carousel />} />
          <Route path="/review" element={<Review />} />
          <Route path="/write-rev" element={<Carousel />} />
          <Route path="/review1" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/home" replace />} /> {/* Fallback route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;