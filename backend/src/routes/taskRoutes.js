import express from "express";
import {
  newTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";

console.log("Task routes loaded");

const router = express.Router();
router.get("/hello", (req, res) => {
  res.json({ message: "Hello from router" });
});
router.post("/task", newTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
