const bcrypt = require('bcryptjs');

const genHashedPassword = async plainTextPassword => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashedPassword;
};

module.exports = {
  genHashedPassword
};
