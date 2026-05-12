import { expect } from "chai";
import request from "supertest";
import AdmZip from "adm-zip";

import app from "../src/app.js";

function createStoreDatasetZip() {
  const zip = new AdmZip();

  zip.addFile(
    "routes.txt",
    Buffer.from("route_id,route_short_name,route_long_name,route_type\n1,T1,Line 1,3")
  );

  zip.addFile(
    "stops.txt",
    Buffer.from("stop_id,stop_name,stop_lat,stop_lon\nstop_1,Central,43.1,4.1")
  );

  zip.addFile(
    "trips.txt",
    Buffer.from("route_id,service_id,trip_id,trip_headsign,direction_id\n1,weekday,trip_1,Central,0")
  );

  zip.addFile(
    "stop_times.txt",
    Buffer.from(
      "trip_id,arrival_time,departure_time,stop_id,stop_sequence\ntrip_1,08:00:00,08:00:00,stop_1,1"
    )
  );

  return zip.toBuffer();
}

describe("💡 GTFS in-memory store endpoint", () => {
  it("should store a GTFS dataset in memory", async () => {
    const response = await request(app)
      .post("/gtfs/store")
      .attach("gtfs", createStoreDatasetZip(), {
        filename: "dataset.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(201);
    expect(response.body.success).to.equal(true);
    expect(response.body.dataset.fileName).to.equal("dataset.zip");
    expect(response.body.dataset.routeCount).to.equal(1);
    expect(response.body.dataset.stopCount).to.equal(1);
    expect(response.body.dataset.tripCount).to.equal(1);
    expect(response.body.dataset.id).to.be.a("string");
  });

  it("should list stored GTFS datasets", async () => {
    await request(app)
      .post("/gtfs/store")
      .attach("gtfs", createStoreDatasetZip(), {
        filename: "dataset.zip",
        contentType: "application/zip",
      });

    const response = await request(app).get("/gtfs/store");

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.datasets).to.be.an("array");
    expect(response.body.datasets.length).to.be.greaterThan(0);
  });

  it("should return an error when required GTFS files are missing", async () => {
    const zip = new AdmZip();

    zip.addFile(
      "routes.txt",
      Buffer.from("route_id,route_short_name\n1,T1")
    );

    const response = await request(app)
      .post("/gtfs/store")
      .attach("gtfs", zip.toBuffer(), {
        filename: "invalid.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
  });
});