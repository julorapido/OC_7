const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const jwtAuth = require('./middleware/authMiddleware');

require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use(cors({corsOptions}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT , () => {
  console.log(`Listening on port ${process.env.PORT}`);
})

//get request to check access to api
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
}); 

//app.get('*', jwtAuth.checkToken);
app.post('/api/auth/checktoken', jwtAuth.checkToken);
app.use('/api/auth', authRoutes);
 
app.use('/api/post', postRoutes);
