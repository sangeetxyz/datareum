export type userData = {
  id?: number;
  name: string;
  org: string;
  email: string;
  phone: string;
  isOrgVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  canContribute?: boolean;
  canDownload?: boolean;
  isGod: boolean;
  token?: string;
  proUrl?: string;
  fireUid: string;
  isContributor: boolean;
  isTac: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface objectType {
  [key: string]: number | string | bigint | boolean | null | Date; // Define the properties of your object here
}

export interface APIProps {
  userData: userData;
}
