// const bcrypt = require('bcryptjs');
// const CryptoJS = require('crypto-js');

// const genHashedPassword = plainTextPassword => {
//   if (plainTextPassword === '') {
//     return null;
//   } else {
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
//     return hashedPassword;
//   }
// };

// let encrypted = CryptoJS.AES.encrypt('pass123', 'Secret Passphrase');
// let hashPass = genHashedPassword(encrypted.toString());
// // console.log(hashPass);
// bcrypt
//   .compare(encrypted.toString(), hashPass)
//   .then(res => console.log(res))
//   .catch(err => console.log(err.message));
// // var decrypted = CryptoJS.TripleDES.decrypt(encrypted, 'Secret Passphrase');
// // console.log(decrypted.toString(CryptoJS.enc.Utf8));
// // genHashedPassword(SHA265('this is a sample text'));

const CryptoJS = require('crypto-js');

// const tripleDESEncrypted = CryptoJS.TripleDES.encrypt(
//   'Message',
//   'passphrase to lock'
// );
// const AESEncrypted = CryptoJS.AES.encrypt(
//   tripleDESEncrypted.toString(),
//   'passphrase to lock'
// );

// const AESDecrypted = CryptoJS.AES.decrypt(AESEncrypted, 'passphrase to lock');
// const tripleDESDecrypted = CryptoJS.TripleDES.decrypt(
//   AESDecrypted,
//   'passphrase to lock'
// );
// console.log(tripleDESDecrypted.toString());

const aesencr = CryptoJS.AES.encrypt('random', 'passphrase');
// console.log(aesencr);
// const aesdecr = CryptoJS.AES.decrypt(aesencr, 'passphrase');
// console.log(aesdecr.toString(CryptoJS.enc.Utf8));
const aesdecr = CryptoJS.AES.decrypt(aesencr.toString(), 'passphrase');
console.log(aesdecr.toString(CryptoJS.enc.Utf8));
