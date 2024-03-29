require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',categoryRoutes);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
