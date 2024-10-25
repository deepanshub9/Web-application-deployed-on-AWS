const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'postgres',        
    host: 'localhost',
    database: 'demodatabase',
    password: '00000000',
    port: 5432,      
});

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
    const { email, message } = req.body;
    
    try {
        
        const query = 'INSERT INTO feedback (email, message) VALUES ($1, $2)';
        await pool.query(query, [email, message]);
        res.status(200).send('Feedback submitted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error submitting feedback');
    }
});

// Serve the HTML file
app.use(express.static(__dirname));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
