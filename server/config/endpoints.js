const BASE = "/api";

const endpoints = {
  USERS: {
    USERS: `${BASE}/users`,
    REGISTER: "/",
  },
  AUTH: {
    LOGIN: '/login',
  },
  PROFILE: {
    PROFILE: `/profile/:email`,
  },
  STUDENT: {
    STUDENT : `${BASE}/student`,
    REGISTER: `${BASE}/register`,
  },
  TEACHER: {
    TEACHER :   `${BASE}/teacher`,
    REGISTER: `${BASE}/register`,
    CLASS: {
      CLASS : `${BASE}/teachers`,
      CREATE: "/classes",
      UPDATE: "/classes/:id",
      DELETE: "/classes/:id",
      LIST:   "/classes/:teacherId",
      LIST_ID: "/classes/:id",
    }
  }
};

module.exports = endpoints;