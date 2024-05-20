import { Request, Response } from "express"
import { TaskRepo } from "../repos/task.repo"
import { TaskDto } from "../dtos/task.dto"
import IResponse from "../interfaces/IResponse"
import { HttpStatusCode } from "axios"

const emitData = (req: Request, task: any) => {
  if (process.env.NODE_ENV !== "development") {
    return
  }
  const io = req.app.get("io")
  io.emit("data", TaskDto.toJson(task))
}
export class TaskController {
  static async createTask(req: Request, res: Response): Promise<IResponse> {
    try {
      const data = TaskDto.fromJson(req.body)
      const task = await TaskRepo.create(data)

      return res.success(
        "Task created.",
        TaskDto.toJson(task),
        HttpStatusCode.Created
      )
    } catch (error: any) {
      return res.error("Task not created!", error.message)
    }
  }

  static async getTaskByUserId(
    req: Request,
    res: Response
  ): Promise<IResponse> {
    try {
      const data = TaskDto.fromJson(req.body)
      const tasks = await TaskRepo.getTaskByUserId(data.userId)
      return res.success("All user tasks.", TaskDto.toArray(tasks))
    } catch (error: any) {
      return res.error("Tasks not found!", error.message)
    }
  }

  static async getTaskById(req: Request, res: Response): Promise<IResponse> {
    try {
      const task = await TaskRepo.getTaskById(Number(req.params.taskId))
      if (!task) {
        return res.success(
          `Task with id ${req.params.taskId} not found`,
          undefined,
          HttpStatusCode.NotFound
        )
      }
      return res.success("Task details.", TaskDto.toJson(task))
    } catch (error: any) {
      return res.error("Task not found!", error.message)
    }
  }

  static async updateTask(req: Request, res: Response): Promise<IResponse> {
    try {
      const data = TaskDto.fromJson(req.body)
      const task = await TaskRepo.update(Number(req.params.taskId), data)
      return res.success("Task updated.", TaskDto.toJson(task))
    } catch (error: any) {
      return res.error("Task not updated!", error.message)
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<IResponse> {
    try {
      const task = await TaskRepo.delete(Number(req.params.taskId))
      return res.success("Task deleted.", TaskDto.toJson(task))
    } catch (error: any) {
      return res.error("Task not deleted!", error.message)
    }
  }
}
