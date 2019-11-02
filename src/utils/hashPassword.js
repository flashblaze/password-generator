const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const { getPasswords } = require('../firebase/firebase.utils');

const genHashedPassword = plainTextPassword => {
  if (plainTextPassword === '') {
    return null;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
    return hashedPassword;
  }
};

const encryptPlainTextPassword = (plainTextPassword, uid) => {
  const encryptedPassword = CryptoJS.AES.encrypt(plainTextPassword, uid);
  return encryptedPassword.toString();
};

const encryptMasterPassword = plainTextPassword => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
  return hashedPassword;
};

const decryptPassword = async uid => {
  let res = await getPasswords(uid);
  res.forEach(encryptedPassword => {
    let decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword.hashedPassword,
      uid
    );
    encryptedPassword.hashedPassword = decryptedPassword.toString(
      CryptoJS.enc.Utf8
    );
  });
  return res;
};

const compareMasterPasswords = (plainMasterPassword, encryptedMasterPassword) =>
  bcrypt.compareSync(plainMasterPassword, encryptedMasterPassword);

module.exports = {
  genHashedPassword,
  encryptPlainTextPassword,
  decryptPassword,
  encryptMasterPassword,
  compareMasterPasswords
};
