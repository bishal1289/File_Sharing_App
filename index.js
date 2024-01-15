require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
const connect = require("./config/db");
const routeController = require("./controller/routes")
connect();


app.use("/", routeController);



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err)
    }
    console.log(`listening on port ${process.env.PORT} 🚀🚀🚀🚀`);
})





