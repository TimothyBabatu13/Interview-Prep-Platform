import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!

export const encryptAccessToken = (id: string) => {
  return jwt.sign(
    { userId: id },
    secret,
    { expiresIn: "5m" }
  );
}

export const decryptAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
};

