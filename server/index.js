const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(
    "mongodb://kobawan:jr66kKAgBl@ds125683.mlab.com:25683/sudoku",
    { useNewUrlParser: true },
)
mongoose.connection.once("open", () => {
    console.log("Connected to Database...")
});

app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true, //TODO: enable according to environment process.env.GRAPHIQL
}));

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});
