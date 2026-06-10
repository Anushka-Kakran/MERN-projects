const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorMiddleware);

module.exports = app;