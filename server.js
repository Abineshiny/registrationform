
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema and model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML and CSS files
app.use(express.static('public'));

// Handle registration form submission
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(200).send('Registration successful!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
