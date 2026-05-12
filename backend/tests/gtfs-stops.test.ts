import { expect } from "chai";
import request from "supertest";
import AdmZip from "adm-zip";

import app from "../src/app.js";

function createStopsZip(stopsContent: string) {
  const zip = new AdmZip();

  zip.addFile("stops.txt", Buffer.from(stopsContent, "utf-8"));

  return zip.toBuffer();
}

describe("🚏 GTFS stops analyzer endpoint", () => {
  it("should analyze GTFS stops", async () => {
    const buffer = createStopsZip(
      [
        "stop_id,stop_name,stop_lat,stop_lon",
        "stop_1,Central Station,43.8367,4.3601",
        "stop_2,Central Station,43.8368,4.3602",
        "stop_3,City Hall,43.8370,4.3610",
      ].join("\n")
    );

    const response = await request(app)
      .post("/gtfs/stops")
      .attach("gtfs", buffer, {
        filename: "stops.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.stopCount).to.equal(3);
    expect(response.body.groupCount).to.equal(2);
    expect(response.body.coordinateIssueCount).to.equal(0);
  });

  it("should detect coordinate anomalies", async () => {
    const buffer = createStopsZip(
      [
        "stop_id,stop_name,stop_lat,stop_lon",
        "stop_1,Invalid Stop,200,4.3601",
        "stop_2,Missing Coordinate,,4.3602",
      ].join("\n")
    );

    const response = await request(app)
      .post("/gtfs/stops")
      .attach("gtfs", buffer, {
        filename: "stops.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.stopCount).to.equal(2);
    expect(response.body.coordinateIssueCount).to.equal(2);
    expect(response.body.stops[0].hasCoordinateIssue).to.equal(true);
    expect(response.body.stops[1].hasCoordinateIssue).to.equal(true);
  });

  it("should return an error when stops.txt is missing", async () => {
    const zip = new AdmZip();

    zip.addFile("routes.txt", Buffer.from("route_id,route_short_name\n1,T1"));

    const response = await request(app)
      .post("/gtfs/stops")
      .attach("gtfs", zip.toBuffer(), {
        filename: "invalid.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("GTFS file not found: stops.txt");
  });
});