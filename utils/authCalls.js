import * as url from "./urls";

export const login = (data) => {
  return fetch(url.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(({ success, data, message }) => {
      if (success) return data;
      throw new Error(message);
    });
};

export const register = (data) => {
  return fetch(url.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(({ success, data, message }) => {
      if (success) return data;
      throw new Error(message);
    });
};
