import passport from "./passport.mid";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.status(info.statusCode || 401).json({
          response: info.message || info.toString(),
        });
      }

      req._user = user;

      next();
    })(req, res, next);
  };
};
