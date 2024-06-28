export const generatePassword = (length) => {
  // Define character sets based on user options
  const characters = [];
  characters.push(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  );

  // Combine all character sets
  const allChars = characters.join("");

  let password = "";
  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password;
};
