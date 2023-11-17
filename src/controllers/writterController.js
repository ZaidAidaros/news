import api from "@/core/api.js";
import handel_error from "@/core/handel_error";
const getWritterProfileURL = "/writter/profile";
const getWritterArticlesURL = "/writter/articles";

async function getWritterProfile() {
  try {
    return await api.get(getWritterProfileURL);
  } catch (error) {
    return handel_error(error);
  }
}
async function loadArticleImage(imgUrl) {
  try {
    return await api.get(imgUrl);
  } catch (error) {
    return handel_error(error);
  }
}
async function loadWritterArticles(published, page) {
  try {
    return await api.get(getWritterArticlesURL, {
      params: { published, page },
    });
  } catch (error) {
    return handel_error(error);
  }
}
async function searchWritterArticles(sVal,published, page) {
  try {
    return await api.get(getWritterArticlesURL+"/search", {
      params: { sVal,published, page },
    });
  } catch (error) {
    return handel_error(error);
  }
}
async function submitArticleForm(data, isEdit) {
  if (isEdit) {
    return await updateArticle(isEdit, data);
  } else {
    return await addArticle(data);
  }
}
async function addArticle(data) {
  try {
    return await api.post(getWritterArticlesURL, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function updateArticle(id, data) {
  try {
    return await api.put(getWritterArticlesURL + "/" + id, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function deleteArticle(id) {
  try {
    return await api.delete(getWritterArticlesURL + "/" + id);
  } catch (error) {
    return handel_error(error);
  }
}
const writterController = {
  getWritterProfile,
  loadWritterArticles,
  searchWritterArticles,
  loadArticleImage,
  submitArticleForm,
  deleteArticle,
};

export default writterController;
