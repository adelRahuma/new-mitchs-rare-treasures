const refObj = (allShops) => {
  const lookUpObj = {};

  allShops.forEach(({ shop_id, shop_name }) => {
    lookUpObj[shop_name] = shop_id;
  });
  return lookUpObj;
};

const formatTreasureData = (lookObj, treasureData) => {
  return treasureData.map((treasure) => {
    return [
      treasure.treasure_name,
      treasure.colour,
      treasure.age,
      treasure.cost_at_auction,
      lookObj[treasure.shop],
    ];
  });
};

const treasureRefObj = (treasures, shops) => {
  const lookUpObj = {};

  treasures.forEach((treasure) => {
    shops.forEach((shops) => {
      if (treasure.shop_id === shops.shop_id) {
        lookUpObj[shops.shop_id] = shops.shop_name;
      }
    });
  });

  return lookUpObj;
};

const FormatSecondtreasureData = (lookObj, treasureData) => {
  return treasureData.map((treasure) => {
    return [
      treasure.treasures_id,
      treasure.treasure_name,
      treasure.treasure_colour,
      treasure.treasure_age,
      treasure.cost_at_auction,
      lookObj[treasure.shop_id],
    ];
  });
};
// const treasure = [
//   {
//     treasures_id: 1,
//     treasure_name: "treasure-a",
//     treasure_colour: "turquoise",
//     treasure_age: 200,
//     cost_at_auction: "£20.00",
//     shop_id: 1,
//   },
// ];
// const shops = [
//   {
//     shop_id: 1,
//     shop_name: "shop-b",
//     shop_owner: "firstname-b",
//     shop_slogan: "slogan-b",
//   },
// ];

// treasureRefObj(treasure, shops);

module.exports = {
  refObj,
  formatTreasureData,
  treasureRefObj,
  FormatSecondtreasureData,
};
