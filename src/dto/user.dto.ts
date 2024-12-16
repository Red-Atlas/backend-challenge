import { IsEmail, IsStrongPassword } from "class-validator";

class UserDTO {
  @IsEmail({}, { message: "El email debe ser formato: nombre@dominio" })
  email: string;

  @IsStrongPassword(
    { minUppercase: 1, minSymbols: 1, minLength: 8 },
    {
      message:
        "La contraseña debe poseer al menos: 1 simbolo, 1 mayuscula y 8 caracteres",
    }
  )
  password: string;
}

export default UserDTO;
