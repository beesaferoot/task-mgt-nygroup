import supertest from "supertest"
import app from "../../src/app"
import {
  truncateTable,
  createTestUser,
  createTask,
  truncateUserTable,
} from "../utils"
import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
} from "@jest/globals"
import { faker } from "@faker-js/faker"

const request = supertest(app)
let token = ""
beforeEach((done) => {
  truncateTable().then(() => done())
})

afterAll(() => {
  truncateUserTable().catch(() => ({}))
})

beforeAll(async () => {
  const email = faker.internet.email()
  const user = await createTestUser(email)
  const res = await request.post(`/api/v1/auth/login`).send({
    email: email,
    password: "testpassword",
  })

  expect(res.statusCode).toBe(200)

  token = res.body.data.token
})

describe("POST /api/v1/tasks create task", () => {
  it("POST /api/v1/tasks unauthorized", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
      endDate: "2025-05-21",
    }
    const res = await request.post(`/api/v1/tasks`).send(reqData)

    expect(res.statusCode).toBe(401)
    expect(res.body.message).toBe("Unauthorized")
  })

  it("POST /api/v1/tasks success", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
      endDate: "2025-05-21",
    }
    const res = await request
      .post(`/api/v1/tasks`)
      .send(reqData)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBe("Task created.")
  })

  it("POST /api/v1/tasks reqiured fields", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
    }
    const res = await request
      .post(`/api/v1/tasks`)
      .send(reqData)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(422)
    expect(res.body.message).toBe("Validation failed")
    expect(res.body.errors.endDate).toEqual("End date is required")
  })

  it("POST /api/v1/tasks date is in the past", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2024-03-20",
      endDate: "2025-03-20",
    }
    const res = await request
      .post(`/api/v1/tasks`)
      .send(reqData)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(422)
    expect(res.body.message).toBe("Validation failed")
    expect(res.body.errors.startDate).toEqual(
      "Start date must not be in the past"
    )
  })

  it("POST /api/v1/tasks start date is greater that end date", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
      endDate: "2025-05-19",
    }
    const res = await request
      .post(`/api/v1/tasks`)
      .send(reqData)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(422)
    expect(res.body.message).toBe("Validation failed")
    expect(res.body.errors).toEqual({
      startDate: "Start date must be less than or equal to end date",
    })
  })
})

describe("GET /api/v1/tasks get all task by user id", () => {
  it("GET /api/v1/tasks success", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
      endDate: "2025-05-21",
    }
    const task = await createTask(user.id, reqData)
    const res = await request
      .get(`/api/v1/tasks`)
      .send({ userId: user.id })
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("All user tasks.")
  })

  it("GET /api/v1/tasks invalid user id", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
      endDate: "2025-05-21",
    }
    const task = await createTask(user.id, reqData)
    const res = await request
      .get(`/api/v1/tasks`)
      .send({ userId: 4 })
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toEqual([])
  })
})

describe("GET /api/v1/tasks get task by id", () => {
  it("GET /api/v1/tasks/:taskId success", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
      endDate: "2025-05-21",
    }
    const task = await createTask(user.id, reqData)
    const res = await request
      .get(`/api/v1/tasks/${task.id}`)
      .send({})
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("Task details.")
    expect(res.body.data).toBeDefined()
    expect(res.body.data.id).toBe(task.id)
  })

  it("GET /api/v1/tasks/:taskId not found", async () => {
    const res = await request
      .get(`/api/v1/tasks/5`)
      .send({})
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(404)
    expect(res.body.message).toBe("Task with id 5 not found")
  })
})
describe("PATCH /api/v1/tasks update task with given id", () => {
  it("PATCH /api/v1/tasks/:taskId success", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
      endDate: "2025-05-21",
    }
    const task = await createTask(user.id, reqData)
    const res = await request
      .patch(`/api/v1/tasks/${task.id}`)
      .send({
        description: "task 9",
      })
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe("Task updated.")
    expect(res.body.data).toBeDefined()
    expect(res.body.data.description).toBe("task 9")
  })

  it("PATCH /api/v1/tasks/:taskId invalid user id", async () => {
    const user = await createTestUser()
    const reqData = {
      userId: user.id,
      description: "task 6",
      startDate: "2025-05-20",
      endDate: "2025-05-21",
    }
    const task = await createTask(user.id, reqData)
    const res = await request
      .patch(`/api/v1/tasks/${task.id}`)
      .send({
        description: "task 9",
        userId: 80,
      })
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe("Task not updated!")
    expect(res.body.errors).toBeDefined()
  })
})

describe("DELETE /api/v1/tasks delete task with given id", () => {
  // TODO
})
