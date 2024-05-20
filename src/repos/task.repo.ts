import { TaskDto } from "../dtos/task.dto"
import { Task } from "../entities/task.entity"
import { connectDb } from "../utils/db.utils"

export class TaskRepo {
  static db = connectDb()
  static tasks = this.db.task

  static async create(task: TaskDto): Promise<Task> {
    try {
      const createdTask = await this.tasks.create({
        data: {
          description: task.description,
          startDate: task.startDate,
          endDate: task.endDate,
          status: task.status,
          userId: task.userId,
        },
      })

      return createdTask
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }

  static async getTaskByUserId(userId: Task["userId"]): Promise<Task[]> {
    try {
      return await this.tasks.findMany({ where: { userId: userId } })
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }

  static async getTaskById(taskId: Task["id"]): Promise<Task> {
    try {
      return await this.tasks.findUnique({ where: { id: taskId } })
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }

  static async update(taskId: Task["id"], task: TaskDto): Promise<Task> {
    try {
      const updatedTask = await this.tasks.update({
        where: { id: taskId },
        data: task,
      })
      return {
        id: updatedTask.id,
        description: updatedTask.description,
        startDate: updatedTask.startDate,
        endDate: updatedTask.endDate,
        status: updatedTask.status,
        userId: updatedTask.userId,
        createdAt: updatedTask.createdAt,
      }
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }

  static async delete(taskId: Task["id"]): Promise<Task> {
    try {
      const deletedTask = await this.tasks.delete({ where: { id: taskId } })
      return {
        id: deletedTask.id,
        description: deletedTask.description,
        startDate: deletedTask.startDate,
        endDate: deletedTask.endDate,
        status: deletedTask.status,
        userId: deletedTask.userId,
        createdAt: deletedTask.createdAt,
      }
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }
}
