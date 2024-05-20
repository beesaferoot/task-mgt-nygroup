import { Request, Response } from "express"
import IResponse from "../interfaces/IResponse"
import { UserRepo } from "../repos/user.repo"
import { UserDto } from "../dtos/user.dto"
import { HttpStatusCode } from "axios"
import { AuthDto } from "../dtos/auth.dto"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jwt.utils"

export class AuthController {
  static async register(req: Request, res: Response): Promise<IResponse> {
    try {
      const data = UserDto.fromJson(req.body)
      const user = await UserRepo.create(data)
      return res.success("User created.", UserDto.toJson(user))
    } catch (error: any) {
      return res.error("User not created!", error.message)
    }
  }
  static async login(req: Request, res: Response): Promise<IResponse> {
    try {
      const data = AuthDto.fromJson(req.body)
      const user = await UserRepo.getUserByEmail(data.email)
      if (!user) {
        return res.error(
          "Invalid credentials",
          undefined,
          HttpStatusCode.Unauthorized
        )
      }
      const hasValidPassword = await bcrypt.compare(
        data.password,
        user.password
      )
      if (!hasValidPassword) {
        return res.error(
          "Invalid credentials",
          undefined,
          HttpStatusCode.Unauthorized
        )
      }
      // generate auth token
      const token = generateToken(user.id)
      return res.success(
        "User authentication success.",
        { token },
        HttpStatusCode.Ok
      )
    } catch (error: any) {
      return res.error(
        "Invalid credentials",
        undefined,
        HttpStatusCode.Unauthorized
      )
    }
  }
}
