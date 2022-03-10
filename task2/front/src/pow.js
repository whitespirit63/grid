import CryptoJS from "crypto-js"

export const pow = (str, zeros) => {
  let nonce = 0;
  let hashed = hash(str, nonce)
  while (hashed.slice(0, zeros).split('').some(e => e !== '0')) {
    nonce += 1;
    hashed = hash(str, nonce);
  }
  return {
    nonce,
    hashed,
  }
}

const hash = (str, nonce) => {
  return CryptoJS.SHA256(nonce + str).toString(CryptoJS.enc.Hex);
};
