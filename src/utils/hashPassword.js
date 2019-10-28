const bcrypt = require('bcryptjs');

const genHashedPassword = plainTextPassword => {
  if (plainTextPassword === '') {
    return null;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
    return hashedPassword;
  }
};

module.exports = {
  genHashedPassword
};
