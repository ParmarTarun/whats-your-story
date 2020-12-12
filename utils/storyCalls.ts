import * as url from "./urls";

export const getMyStories = async () => {
  const token = localStorage.getItem("token");
  return fetch(url.mystories, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(({ success, data, message }) => {
      if (success) return data;
      throw new Error(message);
    });
};
export const getStory = async (id:any) => {
  console.log(id)
  const token = localStorage.getItem("token");
  return fetch(url.story + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(({ success, data, message }) => {
      console.log("dad", data)
      if (success) return data;
      throw new Error(message);
    });
};

export const createStory = async (data: object) => {
  const token = localStorage.getItem("token");
  return fetch(url.story + "new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(({ success, data, message }) => {
      if (success) return true;
      throw new Error(message);
    });
};
export const updateStory = async (id: String, data: object) => {
  const token = localStorage.getItem("token");
  return fetch(url.story + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(({ success, data, message }) => {
      if (success) return true;
      throw new Error(message);
    });
};
export const deleteStory = async (id: String) => {
  const token = localStorage.getItem("token");
  return fetch(url.story + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(({ success, data, message }) => {
      if (success) return true;
      throw new Error(message);
    });
};
