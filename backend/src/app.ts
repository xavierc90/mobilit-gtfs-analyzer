import express from "express";
import cors from "cors";

import gtfsRoutes from "./routes/gtfs.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Mobilit GTFS Analyzer API",
  });
});

app.use("/gtfs", gtfsRoutes);

export default app;