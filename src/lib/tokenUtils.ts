"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

const getTokenSecondsRemaining = (token: string): number | undefined => {
  try {
    const tokenPaylod = JWT_ACCESS_SECRET
      ? (jwt.verify(token, JWT_ACCESS_SECRET as string) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);
    if (tokenPaylod && !tokenPaylod.exp) {
      return 0;
    }
    const remainingSeconds =
      (tokenPaylod.exp as number) - Math.floor(Date.now() / 1000);
    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    return undefined;
  }
};

export const setTokenInCookies = async (
  name: string,
  token: string,
  fallbackMaxAgeInSeconds = 86400,
) => {
  const maxAgeInSeconds = getTokenSecondsRemaining(token);

  await setCookie(name, token, maxAgeInSeconds || fallbackMaxAgeInSeconds);
};
