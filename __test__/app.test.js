const { app } = require("../app");
const request = require("supertest");
const db = require("../db/index");
const testData = require("../db/data/test-data");
const seed = require("../db/seed");
beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("get api", () => {
  test("", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const result = res.body;
        expect(result.msg).toBe("No content found");
      });
  });
});

describe("app", () => {
  test("get Treasures", () => {
    return request(app).get("/api/treasures").expect(200);
  });
  describe("responds with 200 and shows all the treasures ", () => {
    test("display treasures", () => {
      const formattedObject = {};
      return request(app)
        .get("/api/treasures")
        .expect(200)
        .then((result) => {
          result.body.forEach((treasure) => {
            formattedObject.treasures_id = treasure[0];
            formattedObject.treasure_name = treasure[1];
            formattedObject.treasure_colour = treasure[2];
            formattedObject.treasure_age = treasure[3];
            formattedObject.cost_at_auction = treasure[4];
            formattedObject.shop_name = treasure[5];

            expect(formattedObject).toHaveProperty(
              "treasures_id",
              expect.any(Number)
            );
            expect(formattedObject).toHaveProperty(
              "treasure_name",
              expect.any(String)
            );
            expect(formattedObject).toHaveProperty(
              "treasure_colour",
              expect.any(String)
            );
            expect(formattedObject).toHaveProperty(
              "treasure_age",
              expect.any(Number)
            );
            expect(formattedObject).toHaveProperty(
              "cost_at_auction",
              expect.any(String)
            );
            expect(formattedObject).toHaveProperty(
              "shop_name",
              expect.any(String)
            );
          });
        });
    });
  });
});

describe("responds with 200 and sorted treasures by cost_at_auction ASC ", () => {
  test("display treasures", () => {
    const sort_by = [`cost_at_auction`, `treasure_name`];
    const order = [`ASC`, `DESC`];
    const formattedObject = {};
    return request(app)
      .get(`/api/treasures/${sort_by[0]}/${order[1]}`)
      .expect(200)
      .then((result) => {
        if (result.req.path === "/api/treasures/cost_at_auction/DESC")
          expect(result.body[0]).toEqual([
            7,
            "treasure-e",
            "onyx",
            10865,
            "$99,999.99",
            "shop-a",
          ]);
        else
          expect(result.body[0]).toEqual([
            4,
            "treasure-f",
            "onyx",
            56,
            "$0.01",
            "shop-e",
          ]);
      });
  });
});

describe("responds with gold treasures only ", () => {
  test("display treasures", () => {
    const color = "gold";
    const formattedObject = {};
    return request(app)
      .get(`/api/treasures/${color}`)
      .expect(200)
      .then((result) => {
        expect(result.body.rows).toHaveLength(2);
      });
  });
});
describe("POST /api/treasures", () => {
  test("inserts into treasures with using sop_id", () => {
    const treasure = [
      {
        treasure_name: "treasure-j",
        treasure_colour: "gold",
        treasure_age: 11,
        cost_at_auction: 25.99,
        shop_id: 3,
      },
    ];
    return request(app)
      .post(`/api/treasures/`)
      .send(treasure)
      .expect(201)
      .then((result) => {
        expect(result.body.length).toBe(1);
      });
  });
});
describe("PATCH /api/treasures/:treasure_id", () => {
  test("partial update with %10 of price", () => {
    const treasure_id = 26;
    return request(app)
      .patch(`/api/treasures/${treasure_id}`)
      .send({ cost_at_auction: 10 })
      .expect(201)
      .then((result) => {
        const keys = Object.values(result.body[0]);

        expect(keys).toEqual([26, "treasure-z", "ivory", 90, "$44.10", 4]);
      });
  });
});
describe("DELETE /api/treasures/:treasure_id", () => {
  test("delet treasure by id", () => {
    const treasure_id = 26;
    return request(app)
      .delete(`/api/treasures/${treasure_id}`)
      .expect(201)
      .then((result) => {
        const { treasures_id } = result.body[0];
        expect(treasures_id).toEqual(26);
      });
  });
});
describe("GET /api/shops", () => {
  test("returns all shops with specific fields", () => {
    return request(app)
      .get(`/api/shops`)
      .expect(200)
      .then((result) => {
        expect(result.body.rows.length).toEqual(11);
      });
  });
});
describe("GET /api/treasures/", () => {
  test("returns treasures table query by age", () => {
    const filter = [`MAX(treasure_age)`, `MIN(treasure_age)`];
    return request(app)
      .get(`/api/treasures/${filter[0]}`)
      .expect(200)
      .then((result) => {
        expect(result.body.rows.length).toEqual(11);
      });
  });
});
