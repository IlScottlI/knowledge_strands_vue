
import Swal from 'sweetalert2';
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
    ).catch(e => {
      Swal.fire({
        title: 'Oh Snap!',
        text: e,
        icon: 'error',
        confirmButtonText: 'Alright'
      })
    });
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
    ).catch(e => {
      Swal.fire({
        title: 'Oh Snap!',
        text: e,
        icon: 'error',
        confirmButtonText: 'Alright'
      })
    });
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
    ).catch(e => {
      Swal.fire({
        title: 'Oh Snap!',
        text: e,
        icon: 'error',
        confirmButtonText: 'Alright'
      })
    });
  },
  geteLearningItems: async (email) => {
    return await fetch(`https://tsp-appserver.na.pg.com/APIs/eManufacturing/get_eLearning.php?email=${email}`
    ).then((req) =>
      req.json()
    );
  },
  geteLearningSkillBlockItems: async (email) => {
    return await fetch(`https://tsp-appserver.na.pg.com/APIs/eManufacturing/getSkillBlocks.php?email=${email}`
    ).then((req) =>
      req.json()
    );
  }
};

