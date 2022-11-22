const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
//requiring the techs - express, cors, 
require('./server/config/mongoose.config');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true } ) ); 
require('./server/routes/card.routes')(app);
app.listen(port, () => console.log(`Spinning up on port: ${port}`) );

