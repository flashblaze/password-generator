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

const encryptMasterPassword = (plainTextPassword, uid) => {
  const encryptedMasterPassword = CryptoJS.AES.encrypt(
    plainTextPassword,
    plainTextPassword + uid
  );
  return encryptedMasterPassword.toString();
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

const compareMasterPasswords = (
  newMasterPassword,
  oldMasterPassword,
  plainMasterPassword,
  uid
) => {
  const newDecryptedPassword = CryptoJS.AES.decrypt(
    newMasterPassword,
    plainMasterPassword + uid
  );

  const oldDecryptedPassword = CryptoJS.AES.decrypt(
    oldMasterPassword,
    plainMasterPassword + uid
  );

  return (
    newDecryptedPassword.toString(CryptoJS.enc.Utf8) ===
    oldDecryptedPassword.toString(CryptoJS.enc.Utf8)
  );
};

module.exports = {
  genHashedPassword,
  encryptPlainTextPassword,
  decryptPassword,
  encryptMasterPassword,
  compareMasterPasswords
};
