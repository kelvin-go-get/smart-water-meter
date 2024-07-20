import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import meterRoutes from "./routes/meterRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

import { errorHandler, notfound } from "./middlewares/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/meters", meterRoutes);
app.use("/api/customers", customerRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notfound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
