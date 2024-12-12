import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class LoginAuthDto {
  @IsOptional()
  @IsString({ message: 'Username must be a valid string' })
  username?: string; // Username es opcional pero debe ser una cadena válida.

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' }) // Solo si se proporciona el email, debe ser válido.
  email?: string; // Email es opcional pero debe seguir el formato adecuado.

  @IsNotEmpty({ message: 'Password is required' }) // La contraseña es obligatoria.
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Contraseña mínima de 6 caracteres.
  @Matches(/[A-Za-z0-9@$!%*?&]/, {
    message: 'Password contains invalid characters or is too simple',
  }) // Validación para permitir caracteres alfanuméricos y algunos especiales.
  password: string; // La contraseña es obligatoria y debe seguir ciertas reglas.
}
