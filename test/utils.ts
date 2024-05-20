import { connectDb } from "../src/utils/db.utils"
import { faker } from "@faker-js/faker"
import bcrypt from "bcryptjs"

export const truncateTable = async () => {
  // truncate table
  const db = connectDb()
  return db.task.deleteMany({})
}

export const truncateUserTable = async () => {
  const db = connectDb()
  return db.user.deleteMany({})
}

export const createTestUser = async (email?: string) => {
  const db = connectDb()

  const e = email ? email : faker.internet.email()
  return db.user.create({
    data: {
      email: e,
      name: "test user 1",
      password: await bcrypt.hash("testpassword", 10),
    },
  })
}

export const createTask = async (userId: number, data: any) => {
  const db = connectDb()

  return db.task.create({
    data: {
      userId: userId,
      ...data,
      status: "TODO",
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    },
  })
}
