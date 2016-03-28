import express = require("express");
import bodyParser = require("body-parser");


let app = express();

import userRouter = require("./user");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/", userRouter);

app.listen(4444);