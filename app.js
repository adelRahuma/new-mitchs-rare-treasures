const express = require("express");
const {
  getTreasures,
  getapi,
  getTreasuresColor,
  postTreasure,
  patch_treasure,
  deleteTreasure,
  getShops,
  getFilter,
} = require("./controller");

const app = express();
app.use(express.json());
app.get("/api", getapi);
app.get("/api/treasures", getTreasures);
app.get("/api/treasures/:sort_by/:order", getTreasures);
app.get("/api/treasures/:color", getTreasuresColor);
app.post(`/api/treasures`, postTreasure);
app.patch(`/api/treasures/:treasure_id`, patch_treasure);
app.delete(`/api/treasures/:treasure_id`, deleteTreasure);
app.get(`/api/shops`, getShops);
app.get(`/api/treasures/:filter`, getFilter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).sent({ msg: "Check the above error!." });
});
module.exports = { app };
