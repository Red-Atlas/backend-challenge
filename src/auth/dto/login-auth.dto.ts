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
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Contraseña mínima de 6 caracteres.
  @Matches(/[A-Za-z0-9@$!%*?&]/, {
    message: 'Password contains invalid characters or is too simple',
  }) // Validación para permitir caracteres alfanuméricos y algunos especiales.
  password: string;
}
