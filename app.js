const express = require('express');
const session = require('cookie-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./api/routes/sauce.js');
const userRoutes = require('./api/routes/user.js');

const app = express();

app.use(helmet());

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'example.com',
            path: '/api/sauces',
            expires: expiryDate
          }
  })
);

mongoose.connect('mongodb+srv://new_user:cZvh70BPsgZTxEhC@cluster0.abd4f.mongodb.net/myFirstDatabase',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());   

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;