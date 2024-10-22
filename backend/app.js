const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const userRoutes = require('./controller/userController');
const adminRoutes = require('./controller/adminController');

const app = express();


mongoose.connect('mongodb://localhost:27017/Trend-Era/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
