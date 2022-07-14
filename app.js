const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");

/*< ----------------- database connection ---------------> */
require("./lib/connection");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, 'public')));
console.log("__dirname", __dirname);

const userRoutes = require("./modules/user/routes/user.routes");

/*
 < --------------------  ROUTES  ---------------------->
 */
app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/user", userRoutes);
/*
 < --------------------  ROUTES  ---------------------->
 */
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("port is running in " + PORT);
});
