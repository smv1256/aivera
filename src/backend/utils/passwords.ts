import { genSaltSync, hashSync } from "bcrypt-ts";

export default function hashPassword(password: string): { salt: string; hash: string } {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return { salt, hash };
}
