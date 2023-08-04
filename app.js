const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Define port number
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/api_crud'

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log(`Database is connected`) });

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
gv 
// Express middleware
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(express.urlencoded({ extended: false }));

// Define Route
const newsRouter = require('./routes/news.routes');
app.use('/', newsRouter);

//Listening on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

