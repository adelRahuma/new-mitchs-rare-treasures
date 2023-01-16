const db = require("./db/index");
const format = require("pg-format");
const treasures = require("./db/data/test-data/treasures");
const { treasureRefObj, FormatSecondtreasureData } = require("./utils/utils");

const getTreasuresMdl = (req) => {
  const { sort_by, order } = req.params;
  const sortBy = [`cost_at_auction`, `treasure_name`];
  let queryString = `SELECT * FROM  treasures `;
  if (req === undefined) {
    queryString += "ORDER BY treasure_age ASC";
  } else {
    if (sortBy.includes(sort_by))
      queryString += "ORDER BY " + sort_by + ` ${order}`;
  }
  return db
    .query(queryString)

    .then((treasures) => {
      return db.query(`SELECT * FROM shops`).then((shops) => {
        const grabRefObj = treasureRefObj(treasures.rows, shops.rows);

        const formattedResult = FormatSecondtreasureData(
          grabRefObj,
          treasures.rows
        );
        // console.log(formattedResult);
        return formattedResult;
      });
    });
};

function getTreasuresColorMdl(request) {
  const { color } = request.params;
  return db.query(`SELECT * FROM treasures WHERE treasure_colour = $1;`, [
    color,
  ]);
}

function postTreasureMdl(req) {
  const treasure = req.body.map((treasure) => {
    return [
      treasure.treasure_name,
      treasure.treasure_colour,
      treasure.treasure_age,
      treasure.cost_at_auction,
      treasure.shop_id,
    ];
  });
  return db
    .query(
      "INSERT INTO treasures (treasure_name ,treasure_colour,treasure_age ,cost_at_auction,shop_id )VALUES($1,$2,$3,$4,$5) RETURNING *;",
      treasure.flat()
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
}

function patch_treasureMdl(req) {
  const column = Object.entries(req.body);
  const { treasure_id } = req.params;
  let fieldValue = [].concat.apply([], column);
  return db
    .query(
      "UPDATE treasures SET cost_at_auction=cost_at_auction-(cost_at_auction*$1/100)  WHERE treasures_id  = $2 RETURNING *;",
      [fieldValue[1], treasure_id]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
}
function deleteTreasureMdl(req) {
  const { treasure_id } = req.params;
  return db
    .query(
      "DELETE FROM treasures WHERE treasures_id =$1 RETURNING treasures_id",
      [treasure_id]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
}
function getShopsMdl(req) {
  return db
    .query("SELECT shop_id,shop_name,shop_slogan FROM shops")
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
}
function getFilterMdl(req) {
 console.log(req);
  const { filter } = req.params;
  console.log(filter);
  const myFilter = [`MAX(treasure_age)`, `MIN(treasure_age)`];
  let queryString = ` `;
  if (req === undefined) {
    queryString += "SELECT MAX(treasure_age) FROM treasures";
  } else {
    if (myFilter.includes(filter)) queryString += "SELECT $1 FROM treasures";
    queryString += "ORDER BY " + sort_by + ` ${order}`;
  }

  //////////////////////
  // return db
  //   .query(queryString)
  //   .then((result) => {
  //     return result.rows;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}
module.exports = {
  getTreasuresMdl,
  getTreasuresColorMdl,
  postTreasureMdl,
  patch_treasureMdl,
  deleteTreasureMdl,
  getShopsMdl,
  getFilterMdl,
};
