import express from "express"
import { TaskController } from "../controllers/task.controller"
import { TaskDto } from "../dtos/task.dto"
import { validator } from "../middlewares"
import { authMiddleware } from "../middlewares/auth"

const taskRoutes = express.Router()

// taskRoutes.use(authMiddleware)
taskRoutes.post(
  "/tasks",
  authMiddleware,
  validator(TaskDto, "create"),
  TaskController.createTask
)
taskRoutes.get("/tasks/", authMiddleware, TaskController.getTaskByUserId)
taskRoutes.get("/tasks/:taskId", authMiddleware, TaskController.getTaskById)
taskRoutes.patch(
  "/tasks/:taskId",
  authMiddleware,
  validator(TaskDto, "update"),
  TaskController.updateTask
)
taskRoutes.delete("/tasks/:taskId", authMiddleware, TaskController.deleteTask)

export default taskRoutes
