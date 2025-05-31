const frontendMessages = {
    success: {
      login: "Login successful!",
      registration: "Registration successful!",
      studentRegistration: "Student registration successful",
      teacherRegistration: "Teacher registration successful",
      profileFetched: "Profile data retrieved successfully",
      createClass : "Class created successfully!",
      updateClass : "Class updated successfully!"

    },
    error: {
      login: "Login failed. Please check your credentials.",
      registration: "Registration failed",
      server: "An error occurred while connecting to the server",
      profileFetch: "Profile data could not be retrieved : ",
      validation: "All fields are required",
      error : "'An error occurred'",
      creation :"Class not created successfully!",
      delete_class:  'Error deleting class:',
      update_class:'Error updating class:',
     


    },
    confirm :{
      delete_confirmation : "Are you sure you want to delete the class?",
       delete_permission: "You do not have permission to delete this class.",
      update_permission: "You do not have permission to update this class. ",
      update_confirmation: "Are you sure you want to update the class?"
    }
   

   
  };
  
  export default frontendMessages;
  