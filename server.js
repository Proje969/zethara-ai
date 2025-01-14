require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/roadmap', (req, res) => {
    res.sendFile(path.join(__dirname, 'roadmap.html'));
});

// Chat API endpoint
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    
    // Basic response for now
    // In the future, this will integrate with a real AI service
    setTimeout(() => {
        res.json({
            message: "Hello! I'm Zethara AI. I'm still learning and will be able to help you better soon!"
        });
    }, 1000);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 