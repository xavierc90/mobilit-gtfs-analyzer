import { expect } from "chai";
import request from "supertest";
import AdmZip from "adm-zip";

import app from "../src/app.js";

function createTripsZip(files: Record<string, string>) {
  const zip = new AdmZip();

  for (const [fileName, content] of Object.entries(files)) {
    zip.addFile(fileName, Buffer.from(content, "utf-8"));
  }

  return zip.toBuffer();
}

describe("🚌 GTFS trips analyzer endpoint", () => {
  it("should analyze trips and stop times", async () => {
    const buffer = createTripsZip({
      "trips.txt": [
        "route_id,service_id,trip_id,trip_headsign,direction_id",
        "1,weekday,trip_1,Central Station,0",
      ].join("\n"),
      "stop_times.txt": [
        "trip_id,arrival_time,departure_time,stop_id,stop_sequence",
        "trip_1,08:10:00,08:10:00,stop_2,2",
        "trip_1,08:00:00,08:00:00,stop_1,1",
      ].join("\n"),
    });

    const response = await request(app)
      .post("/gtfs/trips")
      .attach("gtfs", buffer, {
        filename: "trips.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.tripCount).to.equal(1);
    expect(response.body.stopTimeCount).to.equal(2);

    expect(response.body.trips[0].id).to.equal("trip_1");
    expect(response.body.trips[0].routeId).to.equal("1");
    expect(response.body.trips[0].serviceId).to.equal("weekday");
    expect(response.body.trips[0].headsign).to.equal("Central Station");
    expect(response.body.trips[0].directionId).to.equal("0");
    expect(response.body.trips[0].stopSequenceCount).to.equal(2);

    expect(response.body.trips[0].stopTimes[0].stopId).to.equal("stop_1");
    expect(response.body.trips[0].stopTimes[1].stopId).to.equal("stop_2");
  });

  it("should handle trips without stop times", async () => {
    const buffer = createTripsZip({
      "trips.txt": [
        "route_id,service_id,trip_id,trip_headsign,direction_id",
        "1,weekday,trip_1,Central Station,0",
      ].join("\n"),
      "stop_times.txt":
        "trip_id,arrival_time,departure_time,stop_id,stop_sequence",
    });

    const response = await request(app)
      .post("/gtfs/trips")
      .attach("gtfs", buffer, {
        filename: "trips.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.tripCount).to.equal(1);
    expect(response.body.stopTimeCount).to.equal(0);
    expect(response.body.trips[0].stopSequenceCount).to.equal(0);
    expect(response.body.trips[0].stopTimes).to.deep.equal([]);
  });

  it("should return an error when trips.txt is missing", async () => {
    const buffer = createTripsZip({
      "stop_times.txt":
        "trip_id,arrival_time,departure_time,stop_id,stop_sequence",
    });

    const response = await request(app)
      .post("/gtfs/trips")
      .attach("gtfs", buffer, {
        filename: "invalid.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("GTFS file not found: trips.txt");
  });

  it("should return an error when stop_times.txt is missing", async () => {
    const buffer = createTripsZip({
      "trips.txt": "route_id,service_id,trip_id\n1,weekday,trip_1",
    });

    const response = await request(app)
      .post("/gtfs/trips")
      .attach("gtfs", buffer, {
        filename: "invalid.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal(
      "GTFS file not found: stop_times.txt"
    );
  });
});