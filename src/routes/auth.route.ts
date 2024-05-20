import express from "express"
import { AuthController } from "../controllers/auth.controller"
import { validator } from "../middlewares"
import { AuthDto } from "../dtos/auth.dto"
import { UserDto } from "../dtos/user.dto"

const authRoutes = express.Router()

authRoutes.post("/auth/register", validator(UserDto), AuthController.register)
authRoutes.post("/auth/login", validator(AuthDto), AuthController.login)

export default authRoutes
