const express = require('express');
const mysql = require('mysql2');
require('dotenv').config()
const cors = require('cors'); // Import cors module
const app = express();

app.use(cors());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME
});

// Connect to MySQL
connection.connect(function (err) {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Define a route for fetching data
app.get('/data', function (req, res) {
  connection.query('SELECT * FROM gallery_img', function (error, results) {
    if (error) {
      console.error('Error querying MySQL: ' + error.stack);
      res.status(500).send('Error fetching data from the database');
      return;
    }
    res.json(results);
  });
});


// Start the server
app.listen(process.env.PORT, function () {
  console.log('Server is running on port 8001');
});
