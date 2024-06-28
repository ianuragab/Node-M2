import bcrypt from "bcrypt";

const saltRounds = 8;

export const hashPass = async (password) => {
  try {
    const hPass = await bcrypt.hash(password, saltRounds);
    return hPass;
  } catch (error) {
    return console.log("Error in Hasing password", error);
  }
};

export const compPass = async (password, dbPassword) => {
  try {
    const compare = await bcrypt.compare(password, dbPassword);
    return compare;
  } catch (error) {
    return console.log("Error in compare password", error);
  }
};
