const express = require("express");
const app = express();
const cors = require("cors");
/*< ----------------- database connection ---------------> */
require("./lib/connection");
require("./multer/index");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
