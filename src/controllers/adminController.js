import api from "@/core/api.js";
import handel_error from "@/core/handel_error";

const statictisURL = "/admin/statictis";
const usersURL = "/admin/users";
const writtersURL = "/admin/writters";
const wArticlesURL = "/admin/writters/articles";
const vistersMsgsURL = "/admin/visters-msgs";
const categoriesURL = "/admin/articles-categories";

async function getStatictis(page, isStoped) {
  try {
    return await api.get(statictisURL);
  } catch (error) {
    return handel_error(error);
  }
}

async function getUsers(page, isStoped) {
  try {
    return await api.get(usersURL, { params: { page, isStoped } });
  } catch (error) {
    return handel_error(error);
  }
}
async function usersSearch(sVal, page, isStoped) {
  try {
    return await api.get(usersURL + "/search", {
      params: { sVal, page, isStoped },
    });
  } catch (error) {
    return handel_error(error);
  }
}

async function updateUser(data) {
  try {
    return await api.put(usersURL, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function deleteUser(id) {
  try {
    return await api.delete(usersURL + "/" + id);
  } catch (error) {
    return handel_error(error);
  }
}

async function getWritters(page, isApproved, isStoped) {
  try {
    return await api.get(writtersURL, {
      params: { isApproved: isApproved ?? null, isStoped, page },
    });
  } catch (error) {
    return handel_error(error);
  }
}
async function writtersSearch(sVal, page, isApproved, isStoped) {
  try {
    return await api.get(writtersURL + "/search", {
      params: { sVal, isApproved: isApproved ?? null, isStoped, page },
    });
  } catch (error) {
    return handel_error(error);
  }
}
async function getWArticles(page, isStoped, writterId) {
  try {
    return await api.get(wArticlesURL, {
      params: { writterId, isStoped, page },
    });
  } catch (error) {
    return handel_error(error);
  }
}
async function updateWritter(data) {
  try {
    return await api.put(writtersURL, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function updateWArticle(data) {
  try {
    return await api.put(wArticlesURL, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function deleteWritter(id) {
  try {
    return await api.delete(writtersURL + "/" + id);
  } catch (error) {
    return handel_error(error);
  }
}

/////////////////////
async function getVistersMsgs(page, isReaded) {
  try {
    return await api.get(vistersMsgsURL, { params: { page, isReaded } });
  } catch (error) {
    return handel_error(error);
  }
}
async function setVisterMsgReaded(id) {
  try {
    return await api.put(vistersMsgsURL + "/" + id, { isReaded: true });
  } catch (error) {
    return handel_error(error);
  }
}
async function deleteVisterMsg(id) {
  try {
    return await api.delete(vistersMsgsURL + "/" + id);
  } catch (error) {
    return handel_error(error);
  }
}
//////////////////

async function getArticlesCategories() {
  try {
    return await api.get(categoriesURL);
  } catch (error) {
    return handel_error(error);
  }
}
async function addArticleCategory(data) {
  try {
    return await api.post(categoriesURL, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function updateArticleCategory(data) {
  try {
    return await api.put(categoriesURL, data);
  } catch (error) {
    return handel_error(error);
  }
}
async function deleteArticleCategory(id) {
  try {
    return await api.delete(categoriesURL + "/" + id);
  } catch (error) {
    return handel_error(error);
  }
}

const adminController = {
  getStatictis,
  getUsers,
  usersSearch,
  writtersSearch,
  getWritters,
  updateUser,
  deleteUser,
  updateWritter,
  deleteWritter,
  getWArticles,
  updateWArticle,
  getVistersMsgs,
  deleteVisterMsg,
  setVisterMsgReaded,
  getArticlesCategories,
  addArticleCategory,
  updateArticleCategory,
  deleteArticleCategory,
};

export default adminController;
