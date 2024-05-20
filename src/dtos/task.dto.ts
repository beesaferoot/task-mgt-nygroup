import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  MinDate,
  Validate,
} from "class-validator"
import { Task } from "../entities/task.entity"
import { IsStartDateBeforeEndDateConstraint } from "../validators/IsStartDateBeforeEndDate"

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export class TaskDto {
  @IsString()
  @IsNotEmpty({
    message: "Description is required",
    groups: ["create"],
  })
  @IsOptional({ groups: ["update"] })
  description: string

  @IsDate({
    message: "Invalid Date valid",
    groups: ["create"],
  })
  @MinDate(new Date(), {
    message: "Start date must not be in the past",
    groups: ["create", "update"],
  })
  @Validate(IsStartDateBeforeEndDateConstraint, ["endDate"], {
    groups: ["create"],
  })
  @IsNotEmpty({ message: "Start Date is required", groups: ["create"] })
  @IsOptional({ groups: ["update"] })
  startDate: Date

  @IsDate({
    message: "Invalid date valid",
    groups: ["create"],
  })
  @MinDate(new Date(), {
    message: "End date must not be in the past",
    groups: ["create", "update"],
  })
  @IsNotEmpty({ message: "End date is required", groups: ["create"] })
  @IsOptional({ groups: ["update"] })
  endDate: Date

  @IsNumber()
  @IsNotEmpty({ message: "User id is required", groups: ["create"] })
  @IsOptional({ groups: ["update"] })
  userId: number

  @IsEnum(TaskStatus)
  @IsOptional({ groups: ["update"] })
  status: TaskStatus = TaskStatus.TODO

  public static fromJson(data: { [key: string]: any }): TaskDto {
    const task: TaskDto = new TaskDto()

    if (data?.description) task.description = data.description
    if (data?.status) task.status = data.status
    if (data?.userId) task.userId = data.userId
    if (data?.startDate) task.startDate = new Date(data.startDate)
    if (data?.endDate) task.endDate = new Date(data.endDate)

    return task
  }

  public static toJson(task: Task): object {
    if (!task) {
      return
    }

    return {
      id: task.id,
      description: task.description,
      stateDate: task.startDate,
      endDate: task.endDate,
      status: task.status,
      createdAt: task.createdAt,
    }
  }

  public static toArray(tasks: Task[]): object[] {
    return tasks.map((task) => this.toJson(task))
  }
}
