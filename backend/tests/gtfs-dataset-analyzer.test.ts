import { expect } from "chai";
import request from "supertest";
import AdmZip from "adm-zip";

import app from "../src/app.js";

function createGtfsDatasetZip(files: Record<string, string>) {
  const zip = new AdmZip();

  for (const [fileName, content] of Object.entries(files)) {
    zip.addFile(fileName, Buffer.from(content, "utf-8"));
  }

  return zip.toBuffer();
}

describe("🔎 GTFS dataset analyzer endpoint", () => {
  it("should generate a GTFS dataset summary", async () => {
    const buffer = createGtfsDatasetZip({
      "agency.txt": "agency_id,agency_name\nagency_1,Demo Agency",
      "routes.txt": "route_id,route_short_name\n1,T1\n2,T2",
      "stops.txt": "stop_id,stop_name\nstop_1,Central\nstop_2,Station",
      "trips.txt": "route_id,service_id,trip_id\n1,weekday,trip_1",
      "stop_times.txt": "trip_id,arrival_time,departure_time,stop_id,stop_sequence\ntrip_1,08:00:00,08:00:00,stop_1,1",
      "calendar.txt": "service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date\nweekday,1,1,1,1,1,0,0,20260101,20261231",
      "calendar_dates.txt": "service_id,date,exception_type\nweekday,20260101,2",
    });

    const response = await request(app)
      .post("/gtfs/analyze")
      .attach("gtfs", buffer, {
        filename: "dataset.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.summary.routeCount).to.equal(2);
    expect(response.body.summary.stopCount).to.equal(2);
    expect(response.body.summary.tripCount).to.equal(1);
    expect(response.body.summary.calendarCount).to.equal(1);
    expect(response.body.summary.calendarDatesCount).to.equal(1);
    expect(response.body.summary.missingFiles).to.deep.equal([]);
  });

  it("should report missing required GTFS files", async () => {
    const buffer = createGtfsDatasetZip({
      "agency.txt": "agency_id,agency_name\nagency_1,Demo Agency",
      "stops.txt": "stop_id,stop_name\nstop_1,Central",
    });

    const response = await request(app)
      .post("/gtfs/analyze")
      .attach("gtfs", buffer, {
        filename: "missing-files.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.summary.routeCount).to.equal(0);
    expect(response.body.summary.stopCount).to.equal(1);
    expect(response.body.summary.tripCount).to.equal(0);
    expect(response.body.summary.missingFiles).to.include("routes.txt");
    expect(response.body.summary.missingFiles).to.include("trips.txt");
    expect(response.body.summary.missingFiles).to.include("stop_times.txt");
  });
});