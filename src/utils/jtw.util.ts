import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(data, process.env.SECRET_JWT, {
    expiresIn: "1d",
  });

  return token;
}

export { createToken };
