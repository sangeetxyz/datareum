import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { userData } from "@/types/types";
import { checker, signer, storage } from "@/firebase/firebase";
import axios from "axios";
import {
  isEmailValid,
  isPhoneNumber,
  isPhoneNumberPresent,
  uploadUserFull,
} from "./helpers";
import { toast } from "react-toastify";

export const handleProfilePhotoUpload = async (
  photo: File | undefined,
  userData: userData,
  isProUploaded: boolean,
) => {
  if (photo != undefined && !isProUploaded) {
    const name = uuidv4();
    const photoRef = ref(storage, `pros/${name + "//" + photo?.name}`);
    await uploadBytes(photoRef, photo!);
    const url = await getDownloadURL(photoRef);
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
      token: userData.token,
      proUrl: url,
      isGod: userData.isGod,
      fireUid: userData.fireUid,
      isContributor: userData.isContributor,
      isTac: userData.isTac,
    };
    await axios
      .put("http://127.0.0.1:3000/api/dev/users", newUserData)
      .then(() => {
        console.log("updated");
      });
  } else {
    console.log("undefinedd photo");
  }
};

export const handleProfileUpdateOnDash = async (
  name: string,
  org: string,
  email: string,
  userData: userData,
) => {
  const newUserData: userData = {
    name: name,
    org: org,
    email: email,
    phone: userData.phone,
    isOrgVerified: userData.isOrgVerified,
    isEmailVerified: userData.isEmailVerified,
    isPhoneVerified: userData.isPhoneVerified,
    canContribute: userData.canContribute,
    canDownload: userData.canDownload,
    token: userData.token,
    isGod: userData.isGod,
    proUrl: userData.proUrl,
    fireUid: userData.fireUid,
    isContributor: userData.isContributor,
    isTac: userData.isTac,
  };
  await axios
    .put("http://127.0.0.1:3000/api/dev/users", newUserData)
    .then(() => {
      console.log("updated");
    });
};

export const handleGetOtpClickedForSignup = async (
  name: string,
  email: string,
  org: string,
  phoneNumber: string,
  isTacAccepted: boolean,
  allUserData: object | null,
) => {
  if (name.length > 1) {
    if (isEmailValid(email)) {
      if (org.length > 1) {
        if (isPhoneNumber(phoneNumber)) {
          if (isTacAccepted) {
            if (isPhoneNumberPresent(allUserData, phoneNumber)) {
              toast.error("You already have an account!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                pauseOnFocusLoss: false,
                theme: "dark",
              });
              console.log("already have an accout");
              return false;
            } else {
              return await signer("+91" + phoneNumber).then(async (value) => {
                if (value === true) {
                  toast.success("OTP sent succesfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                    theme: "dark",
                  });
                  console.log("sms sent");
                  return true;
                } else {
                  toast.error("Something went wrong!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                    theme: "dark",
                  });
                  console.log("sms not sent");
                  return false;
                }
              });
            }
          } else {
            toast.error("Accept Policy Terms!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false,
              theme: "dark",
            });
            console.log("accept t and c");
            return false;
          }
        } else {
          toast.error("Enter a valid phone number!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
            theme: "dark",
          });
          console.log("Enter a valid phone number!");
          return false;
        }
      } else {
        toast.error("Enter a valid Organzation name!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
          theme: "dark",
        });
        console.log("entrt org");
        return false;
      }
    } else {
      toast.error("Enter a valid email!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
        theme: "dark",
      });
      console.log("enter valid email");
      return false;
    }
  } else {
    toast.error("Enter a valid name!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: "dark",
    });
    console.log("enter name");
    return false;
  }
};

export const handleProceedClickedForSignup = (
  OTP: string,
  name: string,
  org: string,
  email: string,
  phoneNumber: string,
  isContributing: boolean,
  isTacAccepted: boolean,
) => {
  console.log(name);
  if (OTP.length === 6) {
    checker(OTP).then(async (value) => {
      if (value === true) {
        uploadUserFull(
          name,
          org,
          email,
          phoneNumber,
          isContributing,
          isTacAccepted,
        );
        toast.info("Welcome!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
          theme: "dark",
        });
        console.log("go to page");
      } else {
        toast.error("Wrong OTP", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
          theme: "dark",
        });
        console.log("wrong otp");
      }
    });
  } else {
    toast.error("Enter a valid OTP!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: "dark",
    });
    console.log("enter otp");
  }
};

export const handleGetOtpClickedForSignin = async (
  phoneNumber: string,
  allUserData: object | null,
) => {
  if (isPhoneNumber(phoneNumber)) {
    if (isPhoneNumberPresent(allUserData, phoneNumber)) {
      return await signer("+91" + phoneNumber).then(async (value) => {
        if (value === true) {
          toast.success("OTP sent successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
            theme: "dark",
          });
          return true;
        } else {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
            theme: "dark",
          });
          return false;
        }
      });
    } else {
      toast.error("You don't have an account!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
        theme: "dark",
      });
      return false;
    }
  } else {
    toast.error("Enter a valid phone number!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return false;
  }
};

export const handleProceedClickedForSignin = (OTP: string) => {
  if (OTP.length === 6) {
    checker(OTP).then(async (value) => {
      if (value === true) {
        toast.success("welcome!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
          theme: "dark",
        });
      } else {
        toast.error("Wrong OTP!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
          theme: "dark",
        });
      }
    });
  } else {
    toast.error("Enter a valid OTP!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: "dark",
    });
  }
};

export const handleGetVerifiedClicked = async (userData: userData) => {
  if (
    userData.canDownload === false ||
    userData.isEmailVerified === false ||
    userData.isOrgVerified === false ||
    userData.isPhoneVerified === false
  ) {
    const newUserData: userData = {
      name: userData.name,
      org: userData.org,
      email: userData.email,
      phone: userData.phone,
      isOrgVerified: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      canContribute: true,
      canDownload: true,
      token: userData.token,
      isGod: userData.isGod,
      proUrl: userData.proUrl,
      fireUid: userData.fireUid,
      isContributor: userData.isContributor,
      isTac: userData.isTac,
    };
    await axios
      .put("http://127.0.0.1:3000/api/dev/users", newUserData)
      .then(() => {
        window.location.reload();
        toast.success("God Mode activated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
          theme: "dark",
        });
      });
  } else {
    toast.error("God Mode is already active!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      theme: "dark",
    });
  }
};
