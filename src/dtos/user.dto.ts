import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
} from "class-validator"
import { User } from "../entities/user.entity"

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required", groups: ["create", "update"] })
  name: string

  @IsEmail({}, { message: "Invalid email." })
  @IsNotEmpty({ message: "Email is required", groups: ["create"] })
  email: string

  @IsStrongPassword(
    { minLength: 6, minUppercase: 2, minNumbers: 1 },
    { message: "Use a stronger password." }
  )
  @IsNotEmpty({ message: "Password is required", groups: ["create"] })
  password: string

  public static fromJson(data: { [key: string]: any }): UserDto {
    const user: UserDto = new UserDto()

    if (data?.email) user.email = data.email
    if (data?.name) user.name = data.name
    if (data?.password) user.password = data.password

    return user
  }

  public static toJson(user: User): object {
    if (!user) {
      return
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }

  public static toArray(users: User[]): object[] {
    return users.map((user) => this.toJson(user))
  }
}
