const express = require("express");
const consola = require("consola");
const path = require("path");
const connectDb = require("./config/connectDb");
const auth = require("./routes/auth");
const users = require("./routes/users");
const profiles = require("./routes/profiles");
const avatar = require("./routes/avatar");
const admin = require("./routes/admin");

const app = express();

//middelwares
app.use(express.json());
app.use("/api/admin", admin);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/avatar", avatar);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function startApp() {
  try {
    //connect Database
    await connectDb();
    //Start the server
    const port = process.env.PORT || 5000;
    await app.listen(port);
    consola.success({
      message: `The Server is Running on port ${port}...`,
      badge: true
    });
  } catch (error) {
    consola.error({ message: err.message, badge: true });
    process.exit(1);
  }
}

startApp();
