import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    setIsRightPanelActive(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = () => {
    const { name, email, password, address } = formData;

    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, address }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Sign Up Successful!");
        } else {
          alert(data.message || "Sign Up Failed.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleSignIn = () => {
    const { email, password } = formData;

    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Sign In Successful!");
        } else {
          alert(data.message || "Sign In Failed.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password || !formData.address) {
        alert("Please fill in all fields for Sign Up.");
        return;
      }
      handleSignUp();
    } else {
      if (!formData.email || !formData.password) {
        alert("Please enter both email and password for Sign In.");
        return;
      }
      handleSignIn();
    }
  };

  return (
    <div className="body-container">
      <div
        className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
        id="container"
      >
        <div>
          <div className={`form-container sign-up-container ${isSignUp ? "active" : ""}`}>
            <form onSubmit={handleFormSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button className="btn-grad">Sign Up</button>
            </form>
          </div>
          <div className={`form-container sign-in-container ${!isSignUp ? "active" : ""}`}>
            <form onSubmit={handleFormSubmit}>
              <h1>Sign In</h1>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <a href="#">Forgot your password?</a>
              <button className="btn-grad">Sign In</button>
            </form>
          </div>
        </div>

        <div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Start from where you left</p>
                <button className="btn-grad" id="signIn" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Buddy!</h1>
                <p>Join Us on a new adventure</p>
                <button className="btn-grad" id="signUp" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
