import api from "@/core/api.js";
import handel_error from "@/core/handel_error";
const getCategoriesURL = "/home/articles-categories";
const getArticlesURL = "/home/articles";
const getArticleCommentsURL = "/home/articles-comments";
const feedbackURL = "/home/feedback";

async function loadCategories() {
  try {
    return await api.get(getCategoriesURL);
  } catch (error) {
    return handel_error(error);
  }
}

async function loadCategoryArticles(page, id) {
  try {
    return await api.get(getArticlesURL, {
      params: { categoryId: id, page },
    });
  } catch (error) {
    return handel_error(error);
  }
}

async function search(sVal, page, categoryId) {
  try {
    return await api.get(getArticlesURL + "/search", {
      params: { sVal,categoryId, page },
    });
  } catch (error) {
    return handel_error(error);
  }
}

async function loadArticle(id) {
  try {
    return await api.get(getArticlesURL + "/" + id);
  } catch (error) {
    return handel_error(error);
  }
}
async function loadArticleComments(page, id) {
  try {
    return await api.get(getArticleCommentsURL, {
      params: { articleId: id, page },
    });
  } catch (error) {
    return handel_error(error);
  }
}

async function sendVisterMsg(data) {
  try {
    return await api.post(feedbackURL, data);
  } catch (error) {
    return handel_error(error);
  }
}

const homeController = {
  search,
  loadCategories,
  loadCategoryArticles,
  loadArticle,
  loadArticleComments,
  sendVisterMsg,
};

export default homeController;
