
export default {
  log: (e) => {
    console.log(e);
  },
  // API Functions
  getGraphUser: async (val, accessToken, top = 6) => {
    return await fetch(`https://graph.microsoft.com/v1.0/me/people?$search=%22${val}%22&$top=${top}&$filter=personType/class%20eq%20%27Person%27`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }
    ).then((req) =>
      req.json()
    );
  },
  getGraphUserProfile: async (accessToken) => {
    return await fetch(`https://graph.microsoft.com/v1.0/me/`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }
    ).then((req) =>
      req.json()
    );
  },
  // API Functions
  getSharePointListItems: async (site, accessToken, list, top = 4999, params = '') => {
    return await fetch(`https://graph.microsoft.com/v1.0/sites/${site}/lists/${list}/items?expand=fields&$top=${top}${params}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }
    ).then((req) =>
      req.json()
    );
  },
  postSharePointListItem: async (site, accessToken, list, data) => {
    return await fetch(`https://graph.microsoft.com/v1.0/sites/${site}/lists/${list}/items/`,
      {
        body: JSON.stringify(data),
        method: "POST",
        headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json' },
      }
    ).then((req) =>
      req.json()
    );
  },
  patchSharePointListItem: async (site, accessToken, list, id, data) => {
    return await fetch(`https://graph.microsoft.com/v1.0/sites/${site}/lists/${list}/items/${id}`,
      {
        body: JSON.stringify(data),
        method: "PATCH",
        headers: { Authorization: "Bearer " + accessToken, 'Content-Type': 'application/json' },
      }
    ).then((req) =>
      req.json()
    );
  },
  getAccessToken: () => {
    let key;
    for (let index = 0; index < localStorage.length; index++) {
      const element = Object.keys(localStorage)[index];
      if (element.includes('accesstoken')) {
        key = element;
      }
    }
    let accessToken = JSON.parse(localStorage.getItem(key)).secret;
    return accessToken;
  }
};

