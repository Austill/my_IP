const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Load DB config
const config = require('./config/_config'); // Update this path if your config is elsewhere

// Routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initialize the app
const app = express();

// ======= DATABASE CONNECTION =======
mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ======= VIEW ENGINE =======
app.set('view engine', 'ejs');

// ======= STATIC FILES =======
app.use(express.static(path.join(__dirname, 'public')));

// ======= MIDDLEWARE =======
app.use(express.json()); // parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // parse form data

// ======= ROUTES =======
app.use('/', index);
app.use('/image', image);

// ======= SERVER =======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
