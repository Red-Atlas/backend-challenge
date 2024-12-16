import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[@$!%*?&]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
