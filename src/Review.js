import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./LoginContext";
import "./Review.css"; // Import the CSS file

function Review() {
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [review, setReview] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const { isnav } = useLogin();

    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

    useEffect(() => {
        if (!isnav) {
            navigate("/login");
        }
    }, [navigate, isnav]);

    const handleImagesChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleVideosChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        setVideos((prevVideos) => [...prevVideos, ...files]);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();

        if (images.length === 0 && videos.length === 0) {
            setStatus("Please select at least one file.");
            return;
        }

        const formData = new FormData();
        images.forEach((image) => formData.append("images", image));
        videos.forEach((video) => formData.append("videos", video));
        formData.append("content", review);
        formData.append("userId", localStorage.getItem("userId"));

        try {
            setIsUploading(true);
            setStatus("Uploading...");

            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setStatus("Uploaded successfully!");
                console.log("Uploaded Data:", result);

                // Reset form
                setImages([]);
                setVideos([]);
                setReview("");
                if (imageInputRef.current) imageInputRef.current.value = "";
                if (videoInputRef.current) videoInputRef.current.value = "";
            } else {
                setStatus(`Error: ${result.message || "Upload failed"}`);
            }
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <h1>Upload Files & Write a Review</h1>
            <div className="inner">
            <form id="uploadForm" encType="multipart/form-data" onSubmit={handleFileUpload}>
                {/* Image Upload */}
                <fieldset className="form-group">
                    <legend>Upload Images</legend>
                    <input 
                        type="file" 
                        name="images"
                        multiple 
                        accept="image/*" 
                        onChange={handleImagesChange} 
                        ref={imageInputRef} 
                        disabled={isUploading}
                    />
                    <div className="preview-container">
                        {images.map((img, index) => (
                            <img key={index} src={URL.createObjectURL(img)} alt="Preview" className="preview-image" />
                        ))}
                    </div>
                </fieldset>

                {/* Video Upload */}
                <fieldset className="form-group">
                    <legend>Upload Videos</legend>
                    <input 
                        type="file" 
                        multiple 
                        accept="video/*" 
                        onChange={handleVideosChange} 
                        ref={videoInputRef} 
                        disabled={isUploading}
                    />
                    <div className="preview-container">
                        {videos.map((vid, index) => (
                            <video key={index} controls className="preview-video">
                                <source src={URL.createObjectURL(vid)} type={vid.type} />
                            </video>
                        ))}
                    </div>
                </fieldset>

                {/* Review Input */}
                <fieldset className="form-group">
                    <legend>Write your review</legend>
                    <textarea 
                        value={review} 
                        onChange={(e) => setReview(e.target.value)} 
                        placeholder="Write your review here..."
                        disabled={isUploading}
                    ></textarea>
                </fieldset>

                <button type="submit" className="upload-button" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload"}
                </button>
            </form>

            <p id="status" className="status-message">{status}</p>
        </div>
        </div>
    );
}

export default Review;
