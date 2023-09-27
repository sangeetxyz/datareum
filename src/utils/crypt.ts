import CryptoJS from "crypto-js";

export const encrypt = (data: object): { data: string; secretKey: string } | null => {
  const generateSecretKey = (length: number) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charsetLength = charset.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      result += charset.charAt(randomIndex);
    }
    return result;
  };
  const secretKey = generateSecretKey(16);
  const blockSize = 16;
  const jsonString = JSON.stringify(data);
  const iv = CryptoJS.lib.WordArray.random(16);
  const paddingSize = blockSize - (jsonString.length % blockSize);
  const paddedJsonString =
    jsonString + String.fromCharCode(paddingSize).repeat(paddingSize);
  try {
    const encryptedData = CryptoJS.AES.encrypt(paddedJsonString, secretKey, {
      mode: CryptoJS.mode.CFB,
      iv: iv,
    }).toString();
    return { data: encryptedData, secretKey: secretKey };
  } catch (error) {
    console.log("some error");
    return null;
  }
};
export const decrypt = (data: string, secretKey: string): object | null => {
  const blockSize = 16;
  const iv = CryptoJS.lib.WordArray.random(blockSize);
  try {
    const decryptedData = CryptoJS.AES.decrypt(data, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CFB,
    });
    const decryptedJsonString = decryptedData.toString(CryptoJS.enc.Utf8);
    const paddingSizeDecrypted = decryptedJsonString.charCodeAt(
      decryptedJsonString.length - 1,
    );
    const originalJsonString = decryptedJsonString.slice(
      0,
      -paddingSizeDecrypted,
    );
    const decryptedObject = JSON.parse(originalJsonString);
    return decryptedObject;
  } catch (error) {
    console.log("error");
    return null;
  }
};
