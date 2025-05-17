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
      CREATE: "/teachers/classes",
      UPDATE: "/teachers/classes/:id",
      DELETE: "/teachers/classes/:id",
      LIST:   "/classes/teachers/:id",
      LIST_ID: "/classes/:id",
    }
  }
};

module.exports = endpoints;