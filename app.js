const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const authRoutes = require('./routes/authRoutes');
const surveyRoutes = require('./routes/surveyRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
  });
app.use('/api/auth', authRoutes);
app.use('/api', surveyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
