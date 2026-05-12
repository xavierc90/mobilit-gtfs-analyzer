import { expect } from "chai";
import request from "supertest";
import AdmZip from "adm-zip";

import app from "../src/app.js";

function createGtfsValidationZip(files: Record<string, string>) {
  const zip = new AdmZip();

  for (const [fileName, content] of Object.entries(files)) {
    zip.addFile(fileName, Buffer.from(content, "utf-8"));
  }

  return zip.toBuffer();
}

describe("👍 GTFS validation endpoint", () => {
  it("should validate a complete GTFS dataset", async () => {
    const buffer = createGtfsValidationZip({
      "agency.txt": "agency_id,agency_name\nagency_1,Demo Agency",
      "routes.txt": "route_id,route_short_name\n1,T1",
      "stops.txt": "stop_id,stop_name\nstop_1,Central",
      "trips.txt": "route_id,service_id,trip_id\n1,weekday,trip_1",
      "stop_times.txt":
        "trip_id,arrival_time,departure_time,stop_id,stop_sequence\ntrip_1,08:00:00,08:00:00,stop_1,1",
      "calendar.txt":
        "service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date\nweekday,1,1,1,1,1,0,0,20260101,20261231",
      "calendar_dates.txt": "service_id,date,exception_type\nweekday,20260101,2",
      "shapes.txt": "shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence\nshape_1,43.1,3.1,1",
      "transfers.txt": "from_stop_id,to_stop_id,transfer_type\nstop_1,stop_1,0",
      "feed_info.txt": "feed_publisher_name,feed_publisher_url,feed_lang\nDemo,http://example.com,fr",
    });

    const response = await request(app)
      .post("/gtfs/validate")
      .attach("gtfs", buffer, {
        filename: "valid-dataset.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.validation.isValid).to.equal(true);
    expect(response.body.validation.errors).to.deep.equal([]);
    expect(response.body.validation.warnings).to.deep.equal([]);
  });

  it("should detect missing required files", async () => {
    const buffer = createGtfsValidationZip({
      "agency.txt": "agency_id,agency_name\nagency_1,Demo Agency",
      "stops.txt": "stop_id,stop_name\nstop_1,Central",
    });

    const response = await request(app)
      .post("/gtfs/validate")
      .attach("gtfs", buffer, {
        filename: "missing-required.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.validation.isValid).to.equal(false);
    expect(response.body.validation.errors).to.include(
      "Missing required file: routes.txt"
    );
    expect(response.body.validation.errors).to.include(
      "Missing required file: trips.txt"
    );
    expect(response.body.validation.errors).to.include(
      "Missing required file: stop_times.txt"
    );
  });

  it("should expose warnings for missing optional files", async () => {
    const buffer = createGtfsValidationZip({
      "agency.txt": "agency_id,agency_name\nagency_1,Demo Agency",
      "routes.txt": "route_id,route_short_name\n1,T1",
      "stops.txt": "stop_id,stop_name\nstop_1,Central",
      "trips.txt": "route_id,service_id,trip_id\n1,weekday,trip_1",
      "stop_times.txt":
        "trip_id,arrival_time,departure_time,stop_id,stop_sequence\ntrip_1,08:00:00,08:00:00,stop_1,1",
    });

    const response = await request(app)
      .post("/gtfs/validate")
      .attach("gtfs", buffer, {
        filename: "missing-optional.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.validation.isValid).to.equal(true);
    expect(response.body.validation.warnings).to.include(
      "Optional file not found: calendar.txt"
    );
    expect(response.body.validation.warnings).to.include(
      "Optional file not found: calendar_dates.txt"
    );
  });

  it("should detect malformed CSV files", async () => {
    const buffer = createGtfsValidationZip({
      "agency.txt": "agency_id,agency_name\nagency_1,Demo Agency",
      "routes.txt": 'route_id,route_short_name\n1,"T1',
      "stops.txt": "stop_id,stop_name\nstop_1,Central",
      "trips.txt": "route_id,service_id,trip_id\n1,weekday,trip_1",
      "stop_times.txt":
        "trip_id,arrival_time,departure_time,stop_id,stop_sequence\ntrip_1,08:00:00,08:00:00,stop_1,1",
    });

    const response = await request(app)
      .post("/gtfs/validate")
      .attach("gtfs", buffer, {
        filename: "malformed-csv.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.validation.isValid).to.equal(false);
    expect(response.body.validation.errors).to.include(
      "Malformed CSV file: routes.txt"
    );
  });
});