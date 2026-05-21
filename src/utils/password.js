import argon2 from "argon2";

export const hashPassword = async (pw) => {
  return await argon2.hash(pw, {
    type: argon2.argon2id,
  });
};

export const verifyPassword = async (hash, pw) => {
  return await argon2.verify(hash, pw);
};
