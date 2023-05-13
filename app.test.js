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
const obId="replace with objext id" //replace with object id
  //tests
  describe("GET /items", () => {
    it("should return all items", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(4)
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
      const res = await request(app).patch(`/items/${obId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.modifiedCount).toBe(1)
    });
  });