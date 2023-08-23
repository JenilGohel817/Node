import bcrypt, { hash } from "bcrypt";

const hashPassword = async (password) => {
  try {
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashPassword) => {
  try {
    const compare = bcrypt.compare(password, hashPassword);
    return compare;
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, comparePassword };
