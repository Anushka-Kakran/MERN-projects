const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {
  taskValidation,
} = require("../validators/taskValidator");

router.use(authMiddleware);

router.post(
  "/",
  taskValidation,
  createTask
);

router.get("/", getTasks);

router.get("/:id", getTask);

router.put(
  "/:id",
  taskValidation,
  updateTask
);

router.delete("/:id", deleteTask);

module.exports = router;