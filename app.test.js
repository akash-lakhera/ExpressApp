const request = require("supertest");
require("dotenv").config();
const items=require("./items")
const {app} = require("./app");
const {con,col}=require("./db")

beforeEach(async () => {
   await con.connect()
  });
  

  afterEach(async () => {
    await con.close();
  });
const obId="645fcdd53c7c34d2fccb8683" //replace with object id
  //tests
  describe("GET /items", () => {
    it("should return all items", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(24)
    });
  });

  describe("GET /items/:item", () => {
    it("should return one item", async () => {
      const res = await request(app).get(`/items/${obId}`);
      expect(res.statusCode).toBe(200);
      expect([res.body].length).toBe(1)
    });
  });

  describe("GET /items/", () => {
    it("should modify one item", async () => {
      const res = await request(app).patch(`/items/${obId}`).send({
        price: 105
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.modifiedCount).toBe(1)
    });
  });