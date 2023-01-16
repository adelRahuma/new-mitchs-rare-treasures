const db = require("./");
const format = require("pg-format");
const shops = require("./data/test-data/shops");
const treasures = require("./data/test-data/treasures");
const { refObj, formatTreasureData } = require("../utils/utils");

const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS shops`);
    })
    .then(() => {
      return db.query(`CREATE TABLE shops(
			shop_id SERIAL PRIMARY KEY, shop_name VARCHAR(50) , shop_owner VARCHAR(50) , shop_slogan TEXT) `);
    })
    .then(() => {
      return db.query(`CREATE TABLE treasures (
		treasures_id SERIAL PRIMARY KEY, treasure_name VARCHAR(50) , treasure_colour VARCHAR(50) , treasure_age INT ,
		cost_at_auction money , shop_id INT REFERENCES shops(shop_id))`);
    })
    .then(() => {
      const allShops = shops.map(({ shop_name, owner, slogan }) => {
        return [shop_name, owner, slogan];
      });

      const stringFormat = format(
        `INSERT INTO shops (shop_name, shop_owner, shop_slogan) VALUES  %L  RETURNING *; `,
        allShops
      );
      return db.query(stringFormat);
    })
    .then((allShops) => {
      const theShops = allShops.rows;
      const resultShops = refObj(theShops);
      const formattedTreasureData = formatTreasureData(
        resultShops,
        treasureData
      );
      const stringFormat = format(
        `INSERT INTO treasures (treasure_name, treasure_colour, treasure_age, cost_at_auction, shop_id)
		 VALUES %L RETURNING *;`,
        formattedTreasureData
      );

      return db.query(stringFormat);
    });
};

module.exports = seed;
