import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

function hashPassword(password: string): { salt: string; hash: string } {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return { salt, hash };
}
