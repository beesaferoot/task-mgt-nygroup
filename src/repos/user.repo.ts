import { UserDto } from "../dtos/user.dto"
import { User } from "../entities/user.entity"
import { connectDb } from "../utils/db.utils"
import bcrypt from "bcryptjs"

export class UserRepo {
  static db = connectDb()
  static users = this.db.user

  static async create(user: UserDto): Promise<User> {
    try {
      const createdUser = await this.users.create({
        data: {
          email: user.email,
          name: user.name,
          password: await bcrypt.hash(user.password, 10),
        },
      })
      return createdUser
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }

  static async getUsers(limit?: number): Promise<User[]> {
    try {
      return await this.users.findMany({ take: limit || 50 })
    } catch (error: any) {
      throw error
    }
  }

  static async getUserById(userId: User["id"]): Promise<User> {
    try {
      return await this.users.findUnique({ where: { id: userId } })
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }

  static async getUserByEmail(email: User["email"]): Promise<User> {
    try {
      return await this.users.findUnique({ where: { email: email } })
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }

  static async update(userId: User["id"], user: UserDto): Promise<User> {
    try {
      const updatedUser = await this.users.update({
        where: { id: userId },
        data: user,
      })
      return {
        name: updatedUser.name,
        email: updatedUser.email,
        id: updatedUser.id,
      }
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }

  static async delete(userId: User["id"]): Promise<User> {
    try {
      const deletedUser = await this.users.delete({ where: { id: userId } })
      return {
        name: deletedUser.name,
        email: deletedUser.email,
        id: deletedUser.id,
      }
    } catch (error: any) {
      throw error
    } finally {
      this.db.$disconnect()
    }
  }
}
