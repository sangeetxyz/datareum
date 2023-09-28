import { auth } from "@/firebase/firebase";
import { objectType, userData } from "@/types/types";
import axios from "axios";
import { User } from "firebase/auth";

export const isEmailValid = (email: string) => {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhoneNumber = (str: string) => {
  // Remove leading and trailing whitespaces, if any
  str = str.trim();

  // Check if the string contains exactly 10 digits using regex
  const tenDigitRegex = /^\d{10}$/;
  return tenDigitRegex.test(str);
};

export const switchSizeReturner = (num: number): any => {
  return num;
};

export const uploadUserFull = async (
  name: string,
  org: string,
  email: string,
  phoneNumber: string,
  isContributing: boolean,
  isTacAccepted: boolean,
) => {
  await axios.post(`${process.env.NEXT_PUBLIC_WEB_URL}api/dev/users`, {
    name: name,
    org: org,
    email: email,
    phone: phoneNumber,
    isOrgVerified: false,
    isEmailVerified: false,
    isPhoneVerified: true,
    canContribute: true,
    isGod: false,
    canDownload: false,
    token: "initial",
    fireUid: auth.currentUser?.uid,
    isContributor: isContributing,
    isTac: isTacAccepted,
  });
};

export const isPhoneNumberPresent = (
  listOfObjects: any,
  phoneNumber: string,
): boolean => {
  return listOfObjects?.some((obj: userData) => obj.phone == phoneNumber);
};

export const findObjectByFireUid = (
  listOfObjects: userData[],
  fireUidToFind: any,
): userData | undefined => {
  return listOfObjects.find((obj: userData) => obj.fireUid === fireUidToFind);
};

export const convertBigIntsToInts = (
  listOfObjects: objectType[],
): objectType[] => {
  return listOfObjects.map((obj) => {
    const convertedObj: objectType = {};
    for (const key in obj) {
      if (typeof obj[key] === "bigint") {
        convertedObj[key] = Number(obj[key]);
      } else {
        convertedObj[key] = obj[key];
      }
    }
    return convertedObj;
  });
};

export const getGreeting = (): string => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "Good evening";
  } else {
    return "hey welcome";
  }
};

export const randomStringGenerator = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const randomValues = new Uint32Array(length);
  let result = "";

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues);
  } else {
    throw new Error("crypto.getRandomValues() not available.");
  }

  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % charactersLength);
  }

  return result;
};

export const tokenGenerator = async (userData: userData) => {
  const newToken: string = randomStringGenerator(50);
  const newUserData: userData = {
    name: userData.name,
    org: userData.org,
    email: userData.email,
    phone: userData.phone,
    isOrgVerified: userData.isOrgVerified,
    isEmailVerified: userData.isEmailVerified,
    isPhoneVerified: userData.isPhoneVerified,
    canContribute: userData.canContribute,
    canDownload: userData.canDownload,
    token: newToken,
    isGod: userData.isGod,
    fireUid: userData.fireUid,
    isTac: userData.isTac,
  };
  await axios
    .put(`${process.env.NEXT_PUBLIC_WEB_URL}api/dev/users`, newUserData)
    .then(() => {
      console.log("updated");
      window.location.reload();
    });
};

export const getAllUsersData = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_WEB_URL}api/dev/users`,
  );
  return data;
};

export const getDashUserData = async (user: User) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_WEB_URL}api/dev/users`,
  );
  const thisUser: userData | undefined = findObjectByFireUid(data, user?.uid);
  return thisUser;
};
