const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

global.__basedir = __dirname;

const app = express();

var corsOptions = {
    origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({force: true}).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

require("./routes/user.routes")(app);
require("./routes/account.routes")(app);
require("./routes/post.routes")(app);
require("./routes/room.routes")(app)
require("./routes/comment.routes")(app);
require("./routes/report.routes")(app);
require("./routes/userFavorite.routes")(app);
require("./routes/statistic.routes")(app);
require("./routes/notification.routes") (app);
require("./routes/extendRequest.routes") (app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
