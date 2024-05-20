import { IsEmail, IsNotEmpty, IsString, isEmail } from "class-validator"

export class AuthDto {
  @IsEmail(undefined, { message: "Invalid email." })
  @IsNotEmpty({ message: "Emmail is required" })
  email: string

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password: string

  public static fromJson(data: { [key: string]: any }): AuthDto {
    const auth: AuthDto = new AuthDto()
    if (data?.email) auth.email = data.email
    if (data?.password) auth.password = data.password

    return auth
  }

  public static toJson(login: { email?: string; password?: string }): object {
    return login
  }
}
