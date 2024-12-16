import jwt from 'jsonwebtoken';
import { verify } from 'argon2';
import { IUser } from '../user/user.dto';
import { JWTPayload } from './auth.dto';
import { userService } from '../user/user.service';
import { User } from '../user/user.entity';

function signJWT({
  user,
  secret = process.env.JWT_SECRET!,
  expiresIn = '1d',
}: {
  user: IUser;
  secret?: string;
  expiresIn?: string;
}) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    } satisfies JWTPayload,
    secret,
    {
      expiresIn,
    }
  );
}

function verifyJWT({
  token,
  secret = process.env.JWT_SECRET!,
  options,
}: {
  token: string;
  secret?: string;
  options?: jwt.VerifyOptions;
}) {
  try {
    const cleanToken = token.replace('Bearer ', '');
    return jwt.verify(cleanToken, secret, options) as JWTPayload;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
  }
}

async function signIn({
  email,
  password,
}: { 
  email: IUser['email'], password: User['password']
}): Promise<{ user: IUser, token: string }> {
  const user = await userService.findOne({
    filter: {
      email: email.toLowerCase(),
      active: true,
    },
  });

  // Compare passwords with argon2
  const compare = await verify(user.password, password);
  if (!compare) {
    throw new Error('invalid-credentials');
  }

  const token = signJWT({ user });

  return {
    user,
    token,
  };
}

async function signUp({
  firstName, lastName, email, password
}: User): Promise<string> {
  const user = await userService.create({ firstName, lastName, email, password });

  const token = signJWT({
    user,
    secret: process.env.JWT_SECRET!,
    expiresIn: '5m',
  });

  return token
}

async function currentUser(token: string) {
  if (!token) {
    return null;
  }

  // We get the userId from the token
  const payload = verifyJWT({ token });

  const user = await userService.findOne({
    filter: {
      id: payload?.id,
      active: true,
    },
  });

  if(!user) throw new Error('Unauthorized: Invalid user')

  return user;
}

async function currentAdminUser(token: string) {
  if (!token) {
    return null;
  };

  // We get the userId from the token
  const payload = verifyJWT({ token });

  const user = await User.findOneBy({
    id: payload?.id,
    active: true,
    role: 'ADMIN',
  });

  if (!user) throw new Error('Unauthorized: User does not have admin privileges')

  return user;
}

export const authService = Object.freeze({
  signIn,
  signUp,
  currentUser,
  currentAdminUser,
  signJWT,
})