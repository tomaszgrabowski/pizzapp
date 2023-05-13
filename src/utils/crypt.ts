import bcrypt from "bcrypt";

const saltRounds = 10;

export const crypt = async (text: string) =>
  await bcrypt.hash(text, saltRounds);

export const compare = async (text: string, hashed: string) =>
  await bcrypt.compare(text, hashed);
