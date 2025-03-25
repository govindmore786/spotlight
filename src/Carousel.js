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
  const [expandedReviews, setExpandedReviews] = useState({});

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

  const hideImages = () => {
    console.log("Hiding images...");
    setImagesHidden(true);
  };

  useEffect(() => {
    if (imagesHidden) {
      const fetchReviews = async () => {
        try {
          const response = await fetch("http://localhost:5000/display");
          const data = await response.json();
          console.log("Fetched Reviews:", data);
          setUploadedReviews(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setUploadedReviews([]);
        }
      };

      fetchReviews();
      const delayToShowReviews = setTimeout(() => {
        setShowReviews(true);
      }, 400);

      return () => clearTimeout(delayToShowReviews);
    }
  }, [imagesHidden]);

  const toggleReadMore = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      {showReviews ? (
        <div className="reviews-container">
          <h1>Uploaded Reviews</h1>
          <div className="reviews-gallery">
            {Array.isArray(uploadedReviews) && uploadedReviews.length > 0 ? (
              uploadedReviews.map((review, index) => {
                const words = review.content.split(" ");
                const shouldTruncate = words.length > 20;
                const displayedContent = expandedReviews[index]
                  ? review.content
                  : words.slice(0, 20).join(" ") + "...";

                return (
                  <div key={index} className="review-card">
                    <h3>Review by {review.userName}</h3>
                    <p>
                      {displayedContent}
                      {shouldTruncate && (
                        <button onClick={() => toggleReadMore(index)}>
                          {expandedReviews[index] ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>
                    <div className="media-container">
                      {/* Image Carousel */}
                      {review.imageUrl && review.imageUrl.length > 0 && (
                        <div
                          id={`imageCarousel${index}`}
                          className="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-inner">
                            {review.imageUrl.map((url, imgIndex) => (
                              <div
                                key={imgIndex}
                                className={`carousel-item ${
                                  imgIndex === 0 ? "active" : ""
                                }`}
                              >
                                <img
                                  src={url}
                                  className="d-block w-100"
                                  alt={`Uploaded ${imgIndex}`}
                                  height={200}
                                />
                              </div>
                            ))}
                          </div>
                          {review.imageUrl.length > 1 && (
      <>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#imageCarousel${index}`}
                            data-bs-slide="prev"
                          >
                            <span
                              className="carousel-control-prev-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#imageCarousel${index}`}
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                          </button> </>)}
                        </div>
                      )}

                      {/* Video Carousel */}
                      {review.videoUrl && review.videoUrl.length > 0 && (
                        <div
                          id={`videoCarousel${index}`}
                          className="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-inner">
                            {review.videoUrl.map((url, vidIndex) => (
                              <div
                                key={vidIndex}
                                className={`carousel-item ${
                                  vidIndex === 0 ? "active" : ""
                                }`}
                              >
                                <video controls className="d-block w-100">
                                  <source src={url} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ))}
                          </div>
                          {review.videoUrl.length > 1 && (
      <>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#videoCarousel${index}`}
                            data-bs-slide="prev"
                          >
                            <span
                              className="carousel-control-prev-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#videoCarousel${index}`}
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                          </>)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
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
              } ${isAnimating && direction === "left" ? "slide-out-left" : ""} ${
                isAnimating && direction === "right" ? "slide-out-right" : ""
              }`}
              style={{ backgroundImage: `url(${images[currentIndex]})` }}
            >
              <div className="leftbt" onClick={prevImage}>
                <ion-icon name="caret-back-outline"></ion-icon>
              </div>
              <div className="rightbt" onClick={nextImage}>
                <ion-icon name="caret-forward-outline"></ion-icon>
              </div>
              <div className="left-bar" onClick={prevImage}></div>
              <div className="right-bar" onClick={nextImage}></div>
              <div className="ups" onClick={hideImages}>
                <ion-icon name="chevron-up-outline"></ion-icon></div>
              <div className="down-bar" onClick={hideImages}></div>
              
              
            </div>
          )}
          {nextIndex !== null && (
            <div
              className={`image-container ${
                direction === "left" ? "slide-in-left" : "slide-in-right"
              }`}
              style={{ backgroundImage: `url(${images[nextIndex]})` }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
}

export default Carousel;
