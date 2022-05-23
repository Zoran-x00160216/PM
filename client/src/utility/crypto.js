import CryptoJS from "crypto-js";

const encrypt = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, "@borjascript").toString();
  return encrypted;
};

export default encrypt;
