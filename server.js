require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');

const models = require('./models');
const schema = require('./schema');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
    console.log('connected to the MongoDB');
});

// require passport configuration
require('./config/passport')(passport);

// create express app
const app = express();

// add middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const server = new ApolloServer({
    schema,
    context: (req) => {
        return {
            models,
            req,
        };
    },
});

server.applyMiddleware({ app });

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log('listening to the port', PORT);
});
