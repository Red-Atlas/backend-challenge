import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto): Promise<{ message: string }> {
    const { username, email, password } = createAuthDto;

    try {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        // Se lanzó un error si ya existe un usuario con el mismo email o username
        throw new BadRequestException('Username or email already in use');
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
      const newUser = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      // Guardar el nuevo usuario en la base de datos
      await this.userRepository.save(newUser);

      return { message: 'User created successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Si ya existe el usuario o email, lanzamos el error correspondiente
      }
      // Lanzamos un error genérico si algo sale mal
      throw new InternalServerErrorException(
        'An error occurred while creating the user',
      );
    }
  }

  async login(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ message: string; token?: string }> {
    const { email, username, password } = loginAuthDto;

    try {
      let user: User;

      // Solo verificamos si el email o username existe, no hacemos la consulta aún
      if (email) {
        // Verificamos si existe el usuario por email
        user = await this.userRepository.findOne({ where: { email } });
      } else if (username) {
        // Verificamos si existe el usuario por username
        user = await this.userRepository.findOne({ where: { username } });
      }

      if (!user) {
        // Si no encontramos el usuario por email ni por username
        throw new NotFoundException('User not found');
      }

      // Validar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // Si la contraseña no es válida, lanzamos un error
        throw new BadRequestException('Invalid credentials');
      }
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = this.jwtService.sign(payload);

      return { message: 'Login successful', token };
    } catch (error) {
      // Lanza el error si no se encuentra el usuario o si la contraseña es incorrecta
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      // Si ocurre otro error inesperado
      throw new InternalServerErrorException('An error occurred during login');
    }
  }
}
