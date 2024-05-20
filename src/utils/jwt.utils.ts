import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY || "super_scret_key" 

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "2h" })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (err) {
    return null
  }
}
