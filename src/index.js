require('dotenv').config();
const express = require('express');


const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
// const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// Test route
app.use("/api/students",require("./routes/student"));
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port in ${PORT}`);
});
