import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import users from "../repositories/user.rep";
import auth from "../repositories/auth.rep";

import { createSaltAndHash, genSalt } from "../utils/hash.util";
import { createToken } from "../utils/jtw.util";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const searchedUser = await users.findOneBy({ email });

        if (searchedUser)
          return done(null, false, {
            message: "El email proporcionado ya se encuentra registrado",
            statusCode: 400,
          } as any);

        const userInstance = users.create({ email });
        const user = await users.save(userInstance);

        const authSchema = auth.create({
          password: createSaltAndHash(password, genSalt()),
          user,
        });

        await auth.save(authSchema);

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
        const searchedUser = await users
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.auth", "auth")
          .where("user.email = :email", { email })
          .getOne();

        if (!searchedUser)
          return done(null, false, "Email no encontrado" as any);

        const { password } = searchedUser.auth;
        const [salt] = password.split(":");

        if (createSaltAndHash(incomingPassword, salt) != password)
          return done(null, false, "Contraseña incorrecta" as any);

        req["token"] = createToken({
          id: searchedUser.id,
          role: searchedUser.auth.role,
        });

        done(null, searchedUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
