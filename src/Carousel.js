import React, { useState, useEffect } from "react";
import { useAppContext } from "./AppContext";
import "./App.css";

function Carousel() {
  const images = [
    require("./pics/t1.png"),
    require("./pics/t2.png"),
    require("./pics/t3.png"),
    require("./pics/t4.png"),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(""); // "left" or "right"
  const { imagesHidden, setImagesHidden } = useAppContext();
  const [uploadedReviews, setUploadedReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  const triggerAnimation = (newDirection, newIndex) => {
    setDirection(newDirection);
    setNextIndex(newIndex);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setNextIndex(null);
      setIsAnimating(false);
    }, 500); // Match the CSS animation duration
  };

  const nextImage = () => {
    if (isAnimating) return;
    const newIndex = (currentIndex + 1) % images.length;
    triggerAnimation("left", newIndex);
  };

  const prevImage = () => {
    if (isAnimating) return;
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    triggerAnimation("right", newIndex);
  };

  const up = () => {
    console.log("Hiding images...");
    setImagesHidden(true);
  };

  // Fetch uploaded reviews from the server
  useEffect(() => {
    if (imagesHidden) {
      // Fetch reviews immediately after images are hidden
      const fetchReviews = async () => {
        try {
          const response = await fetch("http://localhost:5000/display");
          const data = await response.json();
          console.log("Fetched Reviews:", data);
          setUploadedReviews(Array.isArray(data) ? data : []); // Ensure it's an array
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setUploadedReviews([]); // Set as empty array on error
        }
      };

      fetchReviews();

      // Delay showing reviews until the animation completes (e.g., 1 second)
      const delayToShowReviews = setTimeout(() => {
        setShowReviews(true);
      }, 400); // Adjust delay to match animation duration

      // Cleanup timer
      return () => clearTimeout(delayToShowReviews);
    }
  }, [imagesHidden]);

  return (
    <div>
      {showReviews ? (
        <div>
          <h1>Uploaded Reviews</h1>
          <div id="reviewGallery">
            {Array.isArray(uploadedReviews) && uploadedReviews.length > 0 ? (
              uploadedReviews.map((review, index) => (
                <div key={index} style={{ margin: "20px 0" }}>
                  <h3>Review {index + 1}</h3>
                  <p>{review.text}</p>
                  <div>
                    {review.images &&
                      review.images.map((url, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={url}
                          alt={`Uploaded image ${imgIndex}`}
                          style={{
                            width: "200px",
                            margin: "10px",
                            height: "100px",
                          }}
                        />
                      ))}
                  </div>
                  <div>
                    {review.videos &&
                      review.videos.map((url, vidIndex) => (
                        <div key={vidIndex} style={{ margin: "10px" }}>
                          <video width="200" height="100" controls>
                            <source src={url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews found or invalid data.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="image-container-wrapper">
          {nextIndex === null && (
            <div
              className={`image-container ${
                imagesHidden ? "shutter-close" : ""
              } ${
                isAnimating && direction === "left" ? "slide-out-left" : ""
              } ${
                isAnimating && direction === "right" ? "slide-out-right" : ""
              }`}
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
              }}
            >
              <div className="leftbt" onClick={prevImage}>
                <ion-icon name="caret-back-outline"></ion-icon>
              </div>
              <div className="rightbt" onClick={nextImage}>
                <ion-icon name="caret-forward-outline"></ion-icon>
              </div>
              <div className="left-bar" onClick={prevImage}></div>
              <div className="right-bar" onClick={nextImage}></div>
              <div className="down-bar" onClick={up}>
                <div className="minus"></div>
              </div>
            </div>
          )}

          {nextIndex !== null && (
            <div
              className={`image-container ${
                direction === "left" ? "slide-in-left" : "slide-in-right"
              }`}
              style={{
                backgroundImage: `url(${images[nextIndex]})`,
              }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
}

export default Carousel;
