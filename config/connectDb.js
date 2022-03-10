const { connect } = require("mongoose");
const consola = require("consola");
const config = require("config");
const db = config.get("MONGO_URI");

async function connectDb() {
  try {
    await connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    consola.success({
      message: "Connection to database with success ...",
      badge: true
    });
  } catch (error) {
    consola.error({
      message: error.message,
      badge: true
    });
    process.exit(1);
  }
}

module.exports = connectDb;
