import axios from "axios";

const API_URL = process.env.VUE_APP_API_PROTOCOL + process.env.VUE_APP_API_URL;
const BASE_URL = API_URL + "/advertisings";

let headersWithoutToken = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
};

let headersWithToken = token => {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  };
};

export default {
  create(payload, token) {
    return axios.post(BASE_URL + "/create", payload, headersWithToken(token));
  },

  getAll(per_page, page, token) {
    return axios.get(BASE_URL + "/all/admin", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      params: {
        per_page,
        page
      }
    });
  },

  getAllActive(per_page, page, token) {
    return axios.get(BASE_URL + "/all/active", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      params: {
        per_page,
        page
      }
    });
  },

  getAllInactive(per_page, page, token) {
    return axios.get(BASE_URL + "/all/inactive", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      params: {
        per_page,
        page
      }
    });
  },

  getAllWaitingReview(per_page, page, token) {
    return axios.get(BASE_URL + "/all/waiting-review", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      params: {
        per_page,
        page
      }
    });
  },

  getAllActiveBySegmentId(id, per_page, page, token) {
    return axios.get(
      BASE_URL + `/all/by-segment/${id}`,
      headersWithToken(token),
      { params: { per_page, page } }
    );
  },

  getAllActiveByCategoryId(id, per_page, page, token) {
    return axios.get(
      BASE_URL + `/all/by-category/${id}`,
      headersWithToken(token),
      { params: { per_page, page } }
    );
  },

  getAllActiveBySubategoryId(id, per_page, page, token) {
    return axios.get(
      BASE_URL + `/all/by-subcategory/${id}`,
      headersWithToken(token),
      { params: { per_page, page } }
    );
  },

  getAllActiveByUserId(id, per_page, page, token) {
    return axios.get(BASE_URL + `/all/by-user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      params: {
        per_page,
        page
      }
    });
  },

  getAllFinalized(per_page, page, token) {
    return axios.get(BASE_URL + `/all/by-status/finalized`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      params: {
        per_page,
        page
      }
    });
  },

  getById(id, token) {
    return axios.get(BASE_URL + `/by-id/${id}`, headersWithToken(token));
  },

  update(payload, id, token) {
    // console.log(BASE_URL + `/update/${id}`);
    return axios.put(BASE_URL + `/update/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  },
  updateStock(payload, id, token) {
    return axios.get(
      BASE_URL + `/update/stock/${id}`,
      payload,
      headersWithToken(token)
    );
  },

  updateStatus(payload, id, token) {
    return axios.put(
      BASE_URL + `/update/status/${id}`,
      payload,
      headersWithToken(token)
    );
  },

  delete(id, token) {
    return axios.delete(BASE_URL + `/delete/${id}`, headersWithToken(token));
  }
};
