import jwt from "jsonwebtoken";
import { StringValue } from "ms";

const secret = process.env.JWT_SECRET!



export const encryptToken = (id: string, time: number | StringValue, jti: string) => {
  return jwt.sign(
    { userId: id, jti },
    secret,
    { expiresIn: time }
  );
}

export const decryptToken = (token: string) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
};

