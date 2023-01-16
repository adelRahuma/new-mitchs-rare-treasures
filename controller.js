const {
  getTreasuresMdl,
  getTreasuresColorMdl,
  postTreasureMdl,
  patch_treasureMdl,
  deleteTreasureMdl,
  getShopsMdl,
  getFilterMdl,
} = require("./model");

function getapi(req, res, next) {
  res.status(200).send({ msg: "No content found" });
}

function getTreasures(req, res, next) {
  getTreasuresMdl(req)
    .then((formattedResult) => {
      res.status(200).send(formattedResult);
    })
    .catch((err) => {
      next(err);
    });
}

function getTreasuresColor(req, res, next) {
  getTreasuresColorMdl(req)
    .then((formattedResult) => {
      res.status(200).send(formattedResult);
    })
    .catch((err) => {
      next(err);
    });
}
function postTreasure(req, res, next) {
  postTreasureMdl(req)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function patch_treasure(req, res, next) {
  patch_treasureMdl(req)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function deleteTreasure(req, res, next) {
  deleteTreasureMdl(req)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function getShops(req, res, next) {
  getShopsMdl(req)
    .then((data) => {
      //console.log(data);
      res.status(200).send({ rows: data });
    })
    .catch((err) => {
      next(err);
    });
}
function getFilter(req, res, next) {
  console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQq");
  getFilterMdl(req)
    .then((data) => {
      console.log(data);
      //res.status(200).send({ rows: data });
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = {
  getapi,
  getTreasures,
  getTreasuresColor,
  postTreasure,
  patch_treasure,
  deleteTreasure,
  getShops,
  getFilter,
};
