import { expect } from "chai";
import request from "supertest";
import AdmZip from "adm-zip";

import app from "../src/app.js";

function createGtfsZip(files: string[]) {
  const zip = new AdmZip();

  for (const file of files) {
    zip.addFile(file, Buffer.from("test"));
  }

  return zip.toBuffer();
}

describe("GTFS zip inspection endpoint", () => {
  it("should inspect a valid GTFS zip", async () => {
    const buffer = createGtfsZip([
      "agency.txt",
      "stops.txt",
      "routes.txt",
      "trips.txt",
      "stop_times.txt",
    ]);

    const response = await request(app)
      .post("/gtfs/inspect-zip")
      .attach("gtfs", buffer, {
        filename: "valid-gtfs.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.inspection.isValidGtfsZip).to.equal(true);
    expect(response.body.inspection.missingRequiredFiles).to.deep.equal([]);
  });

  it("should detect missing required GTFS files", async () => {
    const buffer = createGtfsZip(["agency.txt", "stops.txt"]);

    const response = await request(app)
      .post("/gtfs/inspect-zip")
      .attach("gtfs", buffer, {
        filename: "invalid-gtfs.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.inspection.isValidGtfsZip).to.equal(false);
    expect(response.body.inspection.missingRequiredFiles).to.include(
      "routes.txt"
    );
    expect(response.body.inspection.missingRequiredFiles).to.include(
      "trips.txt"
    );
    expect(response.body.inspection.missingRequiredFiles).to.include(
      "stop_times.txt"
    );
  });

  it("should reject non zip files", async () => {
    const response = await request(app)
      .post("/gtfs/inspect-zip")
      .attach("gtfs", Buffer.from("not a zip"), {
        filename: "not-a-zip.txt",
        contentType: "text/plain",
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal("Only .zip files are allowed");
  });
});