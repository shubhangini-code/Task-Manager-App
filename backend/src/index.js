import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./db.js";

import router from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 8001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();

app.use("/api/v1", router);
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working",
  });
});

app.listen(port, () => {
  console.log(`Serve running on port ${port}...`);
});
