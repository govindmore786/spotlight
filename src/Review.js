import React, { useState } from "react";

function Review() {
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [review, setReview] = useState("");

    const handleFileUpload = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        // Add images to the form data
        for (let i = 0; i < images.length; i++) {
            formData.append("files", images[i]);
        }

        // Add videos to the form data
        for (let i = 0; i < videos.length; i++) {
            formData.append("files", videos[i]);
        }

        // Add review text to the form data
        formData.append("review", review);

        try {
            setStatus("Uploading...");
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (response.ok) {
                setStatus(`Upload successful!`);
                console.log("Uploaded Data:", result);
            } else {
                setStatus(`Error: ${result.message}`);
            }
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    const handleImagesChange = (event) => {
        setImages(event.target.files);
    };

    const handleVideosChange = (event) => {
        setVideos(event.target.files);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    return (
        <div>
            <h1>Upload Files and Write Review</h1>
            <form id="uploadForm" encType="multipart/form-data" onSubmit={handleFileUpload}>
                <div>
                    <label htmlFor="imageInput">Select Images:</label>
                    <input
                        type="file"
                        name="images"
                        id="imageInput"
                        multiple
                        accept="image/*"
                        onChange={handleImagesChange}
                    />
                </div>

                <div>
                    <label htmlFor="videoInput">Select Videos:</label>
                    <input
                        type="file"
                        name="videos"
                        id="videoInput"
                        accept="video/*"
                        multiple
                        onChange={handleVideosChange}
                    />
                </div>

                <div>
                    <label htmlFor="reviewInput">Write your review:</label>
                    <textarea
                        id="reviewInput"
                        value={review}
                        onChange={handleReviewChange}
                        placeholder="Write your review here..."
                    ></textarea>
                </div>

                <button type="submit">Upload</button>
            </form>

            <p id="status">{status}</p>
        </div>
    );
}

export default Review;
