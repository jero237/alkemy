//Dependecies
const express = require('express');
const app = express();
const cors = require('cors');
//Routes
const auth = require('./routes/auth');
const main = require('./routes/main');

app.use(express.json());
app.use(cors());

app.use('/', auth)