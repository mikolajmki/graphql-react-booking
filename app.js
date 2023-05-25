const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use('/graphql', graphqlHttp({ 
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
 }));

mongoose.connect('mongodb+srv://mikolajmki:social-media-app@node-rest-shop.7xmmw98.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    app.listen(8000);
})
.catch(err => {
    console.log(err);
});
