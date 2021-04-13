const express = require('express');
require('dotenv').config();

//  console.log(process.env);

const session = require('cookie-session');
const helmet = require('helmet');
const contentSecurityPolicy = require('helmet-csp');
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./api/routes/sauce.js');
const userRoutes = require('./api/routes/user.js');

const app = express();

app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));

app.use(
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "default.example"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
  })
);

app.use(cors());

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            path: '/api/auth',
            expires: expiryDate
          }
  })
);

mongoose.connect(`mongodb+srv://${process.env.USERNAME_MONGO_DB}:${process.env.PASSWORD_MONGO_DB}@${process.env.CLUSTER}.abd4f.mongodb.net/${process.env.DATABASE_NAME}`,
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