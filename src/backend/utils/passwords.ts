import { hashSync } from "bcrypt-ts";

export default function hashPassword(password: string): { hash: string } {
  const hash = hashSync(password, 10);
  return { hash };
}
