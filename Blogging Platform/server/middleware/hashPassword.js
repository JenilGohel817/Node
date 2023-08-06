import bcrypt, { hash } from "bcrypt";

const hashPassword = async (password) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    console.log(password, hashedPassword);
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, comparePassword };
