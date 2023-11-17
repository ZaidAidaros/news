import api from "@/core/api.js";
import handel_error from "@/core/handel_error";
const getCurrentUserURL = "/user/getCurrentUser";
const profileURL = "/user/profile";
const upToWritterUrl = "/user/beWritter";
const commentsUrl = "/user/articleComment";
const likesUrl = "/user/articleLike";

async function getCurrentUser() {
  try {
    return await api.get(getCurrentUserURL);
  } catch (error) {
    return handel_error(error);
  }
}
async function getProfileData() {
  try {
    return await api.get(profileURL);
  } catch (error) {
    return handel_error(error);
  }
}
async function updateUserInfo(data) {
  try {
    return await api.put(profileURL, data);
  } catch (error) {
    return handel_error(error);
  }
}

async function upToWritterReq(data) {
  try {
    return await api.post(upToWritterUrl, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function updateWritterInfo(data) {
  try {
    return await api.put(upToWritterUrl, data);
  } catch (error) {
    return handel_error(error);
  }
}

async function onLike(isLike, articleId, like) {
  try {
    if (like) {
      if (like.like === isLike) {
        return await api.delete(likesUrl + `/${articleId}`);
      } else {
        return await api.put(likesUrl, { like: isLike, articleId });
      }
    } else {
      return await api.post(likesUrl, { like: isLike, articleId });
    }
  } catch (error) {
    return handel_error(error);
  }
}

async function sendArticleComment(data) {
  try {
    return await api.post(commentsUrl, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function updateArticleComment(data) {
  try {
    return await api.put(commentsUrl, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function deleteArticleComment(id) {
  try {
    return await api.delete(commentsUrl + "/" + id);
  } catch (error) {
    return handel_error(error);
  }
}

const userController = {
  upToWritterReq,
  getCurrentUser,
  getProfileData,
  updateUserInfo,
  updateWritterInfo,
  sendArticleComment,
  updateArticleComment,
  deleteArticleComment,
  onLike,
};

export default userController;
