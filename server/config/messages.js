const messages = {
  auth: {
    error: {
      missingFields: "Email, password and role required!",
      noSuchUser: "There is no such user!",
      wrongPassword: "Password is wrong!",
      invalidRoleOrInfo: "Incomplete information or incorrect role",
      deleteAuth : "You do not have permission to delete this class.",
      teacherID :"Teacher ID required.",
    },
    success: {
      login: "Login successful!",
      registration: "Registration successful!",
      studentRegistration: "Student registration successful",
      teacherRegistration: "Teacher registration successful",
    }
  },

  profile: {
    success: {
      profileLoaded: "Profile data loaded",
    },
    error: {
      userNotFound: "User not found",
    }
  },

  db: {
    error: {
      dbError: "Database error",
      missingInfo: "Required information is missing.",
      required: "All fields are required",
      classDeleted: "Class delete error:",
    },
    success: {
      classCreated: "Class created successfully.",
      classUpdated: "Class updated successfully.",
      classDeleted: "Class deleted successfully."
    }
  },

  server: {
    error: {
      server: "Server error"
    }
  }
};

module.exports = messages;
