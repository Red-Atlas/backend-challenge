import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import User from "../services/user.service";
import UserDTO from "../dto/user.dto";

import { createSaltAndHash } from "../utils/hash.util";
import createToken from "../utils/jtw.util";
import validateInput from "../utils/classValidator.util";

passport.use(
  "register",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const result = await validateInput({ email, password }, UserDTO);

        const searchedUser = await User.findOne({ email: result.email });

        if (searchedUser)
          return done(null, false, {
            message: "El email proporcionado ya se encuentra registrado",
            statusCode: 400,
          } as any);

        const user = User.create(result);

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, incomingPassword, done) => {
      try {
        const result = await validateInput(
          { email, password: incomingPassword },
          UserDTO
        );

        const searchedUser = await User.findOne({
          where: { email: result.email },
          relations: {
            auth: true,
          },
        });

        if (!searchedUser)
          return done(null, false, "Email no encontrado" as any);

        const { password } = searchedUser.auth;
        const [salt] = password.split(":");

        if (createSaltAndHash(result.password, salt) != password)
          return done(null, false, "Contraseña incorrecta" as any);

        req["token"] = createToken({
          id: searchedUser.id,
          role: searchedUser.auth.role,
        });

        const user = {
          id: searchedUser.id,
          email: searchedUser.email,
        };

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload: { id: number; role: number }, done) => {
      const searchedUser = await User.findOne({
        where: { id: payload.id },
      });

      if (!searchedUser)
        return done(null, false, {
          message: "No existe el usuario indicado",
        });

      const user = {
        id: searchedUser.id,
        email: searchedUser.email,
        role: searchedUser.auth.role,
      };

      done(null, user);
    }
  )
);

export default passport;
