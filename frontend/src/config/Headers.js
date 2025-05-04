const headers = {
    JSON: {
      "Content-Type": "application/json",
    },
    AUTH: (token) => ({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }),
  };
  
  export default headers;
  