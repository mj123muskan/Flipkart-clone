const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//routes
const userRoutes = require('./routes/user')

//enviroment variables or constant
env.config();
app.use(express.json());
app.use('/api', userRoutes);

//mongodb connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.z21ul.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=> {
        console.log('Database connected');
    }
);

app.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Hello from server'
    })
})

app.post('/data', (req, res, next) =>{
    res.status(200).json({
        message: req.body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running port on ${process.env.PORT}`);
});
