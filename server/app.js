import express from "express";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import routes from "./routes/index.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);
app.use("*", (_req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.use(errorHandler);

export default app;
