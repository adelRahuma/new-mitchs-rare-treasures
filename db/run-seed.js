const data = require("./data/test-data");
const seed = require("./seed");

const db = require("./index");
seed(data).then(() => {
  return db.end();
});
