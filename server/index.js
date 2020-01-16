require("dotenv").config();
const express = require("express");
const path = require('path');
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true },
)
mongoose.connection.once("open", () => {
    console.log("Connected to Database 🚦")
});

app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true, //TODO: enable according to environment process.env.GRAPHIQL
}));

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'client', 'dist', "index.html"));
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});
