const handel_error = function (error) {
  if (error.response && error.response.data.message) {
    return {
      state: false,
      message: error.response.data.message,
    };
  } else {
    return {
      state: false,
      message: error.message,
    };
  }
};
export default handel_error;
