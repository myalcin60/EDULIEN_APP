const BASE = "/api";

const endpoints = {
  USERS: {
    USERS: `${BASE}/users`,
    REGISTER: "/",
  },
  AUTH: {
    REGISTER: "/register",
    LOGIN: '/login',
    LOGOUT : "",
    RESET_PASSWORD: "",
    REFRESH_TOKEN: "",
    VERIFY_EMAIL: "",
  },
  PROFILE: {
    PROFILE: `/profile/:email`,
  },
  STUDENT: {
    
  },
  TEACHER: {
    
    CLASS: {
      CLASS : `${BASE}/teachers`,
      CREATE: "/teachers/classes",
      UPDATE: "/teachers/classes/:id",
      DELETE: "/teachers/classes/:id",
      LIST:   "/classes/teachers/:id",
      LIST_ID: "/classes/:id",
    }
  }
};

module.exports = endpoints;