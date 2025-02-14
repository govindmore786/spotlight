const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cors = require('cors');
const app = express();

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dbicbndqv', 
    api_key: '524677154382772', 
    api_secret: '4OY6LpJ_ZxqA6k2cLwP2fJIirCY' // Use your actual Cloudinary credentials
});

// Middleware
app.use(cors());
const upload = multer({ dest: 'uploads/' }); // Temporary storage for file uploads

// Store uploaded images URLs
let uploadedImages = [];

// Route to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        uploadedImages.push(result.secure_url); // Save the image URL in the array
        res.status(200).json({ message: 'File uploaded successfully', url: result.secure_url });
    } catch (err) {
        res.status(500).json({ message: 'Upload failed', error: err.message });
    }
});

// Route to display uploaded images
app.get('/display', (req, res) => {
    res.json({ images: uploadedImages });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});