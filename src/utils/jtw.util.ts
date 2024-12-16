import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
}

export default createToken;
