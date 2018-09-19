const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const db = require("./models");
const requestIp = require('request-ip');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(requestIp.mw());
app.use(bodyParser.urlencoded({encoded: true}));
app.use(bodyParser.json());
app.use(express.static("images"));

const routes = require("./routes/api.js");
app.use(routes);



// require("./routes/api.js")(app);

db.sequelize.sync({ force: false }).then(function() {
        app.listen(PORT, function(){
        console.log(`Server running on port ${PORT}`);
    })
});