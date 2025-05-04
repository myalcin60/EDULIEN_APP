const headers = {
    json: {
      "Content-Type": "application/json",
    },
    auth: (token) => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };
  
  module.exports = headers;
  