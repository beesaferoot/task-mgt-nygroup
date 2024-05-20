import express from "express"
import { UserController } from "../controllers/user.controller"
import { UserDto } from "../dtos/user.dto"
import { validator } from "../middlewares"
import { authMiddleware } from "../middlewares/auth"

const userRoutes = express.Router()

userRoutes.post(
  "/users",
  authMiddleware,
  validator(UserDto, "create"),
  UserController.createUser
)
userRoutes.get("/users", authMiddleware, UserController.getUsers)
userRoutes.get("/users/:userId", authMiddleware, UserController.getUserById)
userRoutes.patch(
  "/users/:userId",
  authMiddleware,
  validator(UserDto, "update"),
  UserController.updateUser
)
userRoutes.delete("/users/:userId", authMiddleware, UserController.deleteUser)

export default userRoutes
