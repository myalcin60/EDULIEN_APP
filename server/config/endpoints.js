const BASE = "/api";

const endpoints = {
  USERS: {
    REGISTER: "/",
  },
  AUTH: {
    LOGIN: "/login",
  },
  PROFILE: {
    PROFILE : "/profile/:email",
  },
  STUDENT: {
    REGISTER: "/register",
  },
  TEACHER: {
    REGISTER: "/register",
    CLASS: {
      CREATE: "/teachers/classes",
      UPDATE: "/teachers/classes/:id",
      DELETE: "/teachers/classes/:id",
      LIST: "/teachers/classes",
      LIST_ID : "/teachers/classes/:id",
    }
  }
 
};

module.exports = endpoints;
