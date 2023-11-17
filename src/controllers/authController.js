import api from "@/core/api";
import handel_error from "@/core/handel_error";

const signUpURL = "/auth/signup";
const signInURL = "/auth/login";
const foregetpasswordURL = "/auth/foregetpassword";
const resetpasswordURL = "/auth/resetpassword";
const signUp = async function (data) {
  try {
    return await api.post(signUpURL, data);
  } catch (error) {
    return handel_error(error);
  }
};

const signIn = async function (data) {
  try {
    return await api.post(signInURL, data);
  } catch (error) {
    return handel_error(error);
  }
};
const sendForegetPasswordReq = async function (phoneEmail) {
  try {
    return await api.post(foregetpasswordURL, { phoneEmail });
  } catch (error) {
    return handel_error(error);
  }
};
const restPassword = async function (data) {
  try {
    return await api.post(resetpasswordURL, data);
  } catch (error) {
    return handel_error(error);
  }
};
export { signUp, signIn, sendForegetPasswordReq, restPassword };
