const endpoints = {
  USER: {
    REGISTER: "/auth/register",

  },
  LOGIN: "/login",
  SIGN_UP: "/signup",
  REGISTER: "/register",
  STUDENT_DASHBOARD: "/student-dashboard",
  TEACHER_DASHBOARD: "/teacher-dashboard",
  GET_STUDENT_LIST: "/student/list",
  GET_TEACHER_LIST: "/teacher/list",
  PROFILE: "/profile",
  STUDENT_LOGIN: "/student-login",
  TEACHER_LOGIN: "/teacher-login",
  ABOUT: "/about",
  CONTACT: "/contact",
  DASHBOARD: "/dashboard",

  CLASS: {
    STUDENT_CLASS: "/classes/students/",
    CREATE: "/teachers/classes",
    GET_ALL: "/classes/teachers/",
    DELETE: "/teachers/classes/:id",
    CLASS: "/classes/:classId",
    GET_BY_ID: "/classes/:id",
    INVITE: "/classes/invite",
    UPDATE: "/teachers/classes/:id",

  }

};

export default endpoints;
