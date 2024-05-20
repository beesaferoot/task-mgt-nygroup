import supertest from "supertest"
import app from "../../src/app"
import { truncateTable, truncateUserTable, createTestUser } from "../utils"
import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals"
import { faker } from "@faker-js/faker"

const request = supertest(app)
let token
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

describe("test user controller", () => {
  test("/user endpoint success", async () => {
    const resp = await request
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
    expect(resp.statusCode).toBe(200)
  })
})
