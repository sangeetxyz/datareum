import { ForBcTypes, ForDbTypes, InputObject } from "@/types/types";
import CryptoJS from "crypto-js";
import { Phone } from "lucide-react";

export const generateRandomString = (length: number) => {
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

export const encrypt = (
  data: object,
): { data: string; secretKey: string } | null => {
  const secretKey = generateRandomString(16);
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

export const objectEncryptor = (
  data: object[],
): { secretKey: string; data: string }[] => {
  const encryptedObjectList: { secretKey: string; data: string }[] = [];

  for (const obj of data) {
    const result = encrypt(obj);
    if (result) {
      encryptedObjectList.push({
        secretKey: result.secretKey,
        data: result.data,
      });
    }
  }

  return encryptedObjectList;
};

export const objectIdentificator = (
  data: { data: string; secretKey: string }[],
): { identifier: string; data: string; secretKey: string }[] => {
  const updatedList = data.map((obj) => {
    const identifier = generateRandomString(16); // Generate a random string of 16 characters
    return { ...obj, identifier };
  });

  return updatedList;
};

export const objectSplitter = (data: InputObject[]) => {
  const DbObjectArray: ForDbTypes[] = [];
  const BcObjectArray: ForBcTypes[] = [];
  for (const item of data) {
    const firstObj: {
      identifier: string;
      data: string;
    } = {
      identifier: item.identifier,
      data: item.data,
    };

    const secondObj: {
      identifier: string;
      secretKey: string;
    } = {
      identifier: item.identifier,
      secretKey: item.secretKey,
    };

    DbObjectArray.push(firstObj);
    BcObjectArray.push(secondObj);
  }
  return {
    forDb: DbObjectArray,
    forBc: BcObjectArray,
  };
};

export const objectUserDataMixer = (data: ForDbTypes[], phone: string) => {
  const updatedList = data.map((obj) => {
    return { ...obj, phone };
  });
  return updatedList;
};

export const decryptList = (encryptedObjects: InputObject[]): Object[] => {
  const decryptedList: Object[] = [];

  for (const encryptedObj of encryptedObjects) {
    const { identifier, data, secretKey } = encryptedObj;

    const decryptedData = decrypt(data, secretKey);
    if (decryptedData) {
      decryptedList.push(decryptedData);
    }
  }
  return decryptedList;
};
