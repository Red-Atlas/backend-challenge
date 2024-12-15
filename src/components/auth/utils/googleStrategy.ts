import { User } from 'components/user/user.entity';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { authService } from '../auth.service';

passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOneBy({ googleId: profile?.id })
    if (!user) {
      user = await User.create({
        firstName: profile?.name?.givenName || '',
        lastName: profile?.name?.familyName || '',
        email: profile?.emails?.[0]?.value || '',
        googleId: profile.id,
        active: true,
      }).save()
    }
    const token = authService.signJWT({
      user, secret: process.env.JWT_SECRET!, expiresIn: '1d'
    })
    return done(null, { user, token })
  } catch (error) {
    console.log("soy error", error)
    return done(error)
  }
}));

passport.serializeUser((user, done) => {
  done(null, ((user as any).user as User).id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOneBy({ id: id as string });
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});