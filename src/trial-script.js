// This is for my experimentation and testing purpose

const CryptoJS = require('crypto-js');

const aesencr = CryptoJS.AES.encrypt('random', 'passphrase');
const aesdecr = CryptoJS.AES.decrypt(aesencr.toString(), 'passphrase');
console.log(aesdecr.toString(CryptoJS.enc.Utf8));
