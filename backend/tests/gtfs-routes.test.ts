import { expect } from "chai";
import request from "supertest";
import AdmZip from "adm-zip";

import app from "../src/app.js";

function createRoutesZip(routesContent: string) {
  const zip = new AdmZip();

  zip.addFile("routes.txt", Buffer.from(routesContent, "utf-8"));

  return zip.toBuffer();
}

describe("🛣️ GTFS routes analyzer endpoint", () => {
  it("should analyze GTFS routes", async () => {
    const buffer = createRoutesZip(
      [
        "route_id,route_short_name,route_long_name,route_type,route_color,route_text_color",
        "1,T1,Tram Bus 1,3,D3414E,FFFFFF",
        "2,T2,Tram Bus 2,0,000000,FFFFFF",
      ].join("\n")
    );

    const response = await request(app)
      .post("/gtfs/routes")
      .attach("gtfs", buffer, {
        filename: "routes.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.routeCount).to.equal(2);

    expect(response.body.routes[0]).to.deep.equal({
      id: "1",
      shortName: "T1",
      longName: "Tram Bus 1",
      type: "bus",
      color: "#D3414E",
      textColor: "#FFFFFF",
    });

    expect(response.body.routes[1]).to.deep.equal({
      id: "2",
      shortName: "T2",
      longName: "Tram Bus 2",
      type: "tram",
      color: "#000000",
      textColor: "#FFFFFF",
    });
  });

  it("should normalize missing colors", async () => {
    const buffer = createRoutesZip(
      [
        "route_id,route_short_name,route_long_name,route_type",
        "1,T1,Tram Bus 1,3",
      ].join("\n")
    );

    const response = await request(app)
      .post("/gtfs/routes")
      .attach("gtfs", buffer, {
        filename: "routes.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(200);

    expect(response.body.routes[0].color).to.equal("#000000");
    expect(response.body.routes[0].textColor).to.equal("#FFFFFF");
  });

  it("should return an error when routes.txt is missing", async () => {
    const zip = new AdmZip();

    zip.addFile(
      "stops.txt",
      Buffer.from("stop_id,stop_name\n1,Central")
    );

    const response = await request(app)
      .post("/gtfs/routes")
      .attach("gtfs", zip.toBuffer(), {
        filename: "invalid.zip",
        contentType: "application/zip",
      });

    expect(response.status).to.equal(400);
    expect(response.body.success).to.equal(false);
    expect(response.body.message).to.equal(
      "GTFS file not found: routes.txt"
    );
  });
});