import { Request, Response, NextFunction } from "express"
import { HttpStatusCode } from "axios"
import { verifyToken } from "../utils/jwt.utils"

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: "Unauthorized" })
  }

  const payload = verifyToken(token)

  if (!payload) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: "Unauthorized" })
  }

  req.updateContext({ user: payload })
  next()
}
