const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Connection = require("./Database/db");
const { signUp, logIn, validateUserToken } = require("./Handlers/users");
const placeOrder = require("./Handlers/order");
// const { sign } = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;
Connection();

app.post("/login", logIn);
app.post("/signup", signUp);
app.post("/validate-user-token", validateUserToken);
app.post("/place-order", placeOrder);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
