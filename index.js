const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose.connect('mongodb://localhost:27017/tododb')
.catch(error => console.log(`DB Connection error: ${error}`));


const con = mongoose.connection;

con.on('open', error => {
    if(!error)
      console.log('DB Connection Successful');
    else  
      console.log(`Error Connecting to DB: ${error}`);  
});


app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/todo', require('./routes/todo'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));