const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const sequelize = require("sequelize");
const db = require("./models")


const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());

const routes = require("./routes/api.js");
app.use(routes);

app.use(express.static("images"));


// require("./routes/api.js")(app);

db.sequelize.sync({ force: false }).then(function() {
        app.listen(PORT, function(){
        console.log(`Server running on port ${PORT}`);
    })
});