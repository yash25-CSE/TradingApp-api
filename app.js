const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const frontendPath = path.join(__dirname, '..', 'admin');



// ✅ Middleware (order matters!)
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Handles form data
app.use(express.json());                         // Handles JSON data

// ✅ Serve uploaded images publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
const dailyPerformanceRoutes = require('./routes/dailyPerformance');
app.use('/api/daily-performance', dailyPerformanceRoutes);

app.use('/api/daily-update', require('./routes/dailyUpdate'));
app.use('/api/about-trade', require('./routes/aboutTrade'));
app.use('/api/watch-video', require('./routes/watchVideo'));
app.use('/api/buy-product', require('./routes/buyProduct'));
app.use('/api/trading-sessions', require('./routes/tradingSession'));

app.use('/uploads', express.static('uploads'));
app.use('/api/chart-patterns', require('./routes/chartPattern'));
app.use('/api', require('./routes/chartPattern')); // Ensure this line is included

app.use('/api', require('./routes/tradingMaterial'));

const helpDeskRouter = require('./routes/helpDesk');
app.use('/api/help-desk', helpDeskRouter);

const askedQuestionRoutes = require('./routes/askedQuestion');
app.use('/api/asked-questions', askedQuestionRoutes);




// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


// ✅ Serve the admin frontend
app.use(express.static(frontendPath));


app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});




// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
