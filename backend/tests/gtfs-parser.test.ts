import { expect } from "chai";
import request from "supertest";
import AdmZip from "adm-zip";

import app from "../src/app.js";

function createGtfsZipWithFile(fileName: string, content: string) {
  const zip = new AdmZip();

  zip.addFile(fileName, Buffer.from(content, "utf-8"));

  return zip.toBuffer();
}

describe("GTFS CSV parser endpoint", () => {
  it("should parse a GTFS txt file from a zip", async () => {
    const buffer = createGtfsZipWithFile(
      "routes.txt",
      "route_id,route_short_name,route_long_name\n1,T1,Tram Bus 1"
    );

    const response = await request(app)
      .post("/gtfs/parse-file")
      .field("fileName", "routes.txt")
      .attach("gtfs", buffer, {
        filename: "gtfs.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.fileName).to.equal("routes.txt");
    expect(response.body.rowCount).to.equal(1);
    expect(response.body.rows[0]).to.deep.equal({
      route_id: "1",
      route_short_name: "T1",
      route_long_name: "Tram Bus 1",
    });
  });

  it("should support UTF-8 BOM in headers", async () => {
    const buffer = createGtfsZipWithFile(
      "routes.txt",
      "\uFEFFroute_id,route_short_name\n1,T1"
    );

    const response = await request(app)
      .post("/gtfs/parse-file")
      .field("fileName", "routes.txt")
      .attach("gtfs", buffer, {
        filename: "gtfs.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.rows[0]).to.deep.equal({
      route_id: "1",
      route_short_name: "T1",
    });
  });

  it("should return an error when fileName is missing", async () => {
    const buffer = createGtfsZipWithFile(
      "routes.txt",
      "route_id,route_short_name\n1,T1"
    );

    const response = await request(app)
      .post("/gtfs/parse-file")
      .attach("gtfs", buffer, {
        filename: "gtfs.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("Missing GTFS file name");
  });

  it("should return an error when GTFS file is not found", async () => {
    const buffer = createGtfsZipWithFile(
      "routes.txt",
      "route_id,route_short_name\n1,T1"
    );

    const response = await request(app)
      .post("/gtfs/parse-file")
      .field("fileName", "stops.txt")
      .attach("gtfs", buffer, {
        filename: "gtfs.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("GTFS file not found: stops.txt");
  });
});