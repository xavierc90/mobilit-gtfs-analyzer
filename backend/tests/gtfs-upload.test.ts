import { expect } from "chai";
import request from "supertest";

import app from "../src/app.js";

describe("🚀 GTFS upload endpoint", () => {
  it("should return an error when no file is uploaded", async () => {
    const response = await request(app).post("/gtfs/upload");

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("No file uploaded");
  });
});