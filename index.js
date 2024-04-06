// Import MySQL module
const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create connection configuration
const connection = mysql.createConnection({
  host: 'localhost', // Change this to your MySQL server host
  user: 'root', // Change this to your MySQL username
  password: '', // Change this to your MySQL password
  database: 'students-api' // Change this to your MySQL database name
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err);
      return;
    }
    console.log('Connected to MySQL database!');
  });
  
  // Define route to get students data as JSON
  app.get('/students', (req, res) => {
    // Execute MySQL query to get students data
    connection.query('SELECT * FROM students', (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      // Send JSON response with students data
      res.json(results);
    });
  });
  
  // Set up server to listen on port 3000
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });