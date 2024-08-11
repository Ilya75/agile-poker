// api.js

export const loginUser = (gameName, userName, isLead) => {
    // Mock API call to log in the user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login
        //resolve({ name: username, card: Math.floor(Math.random() * 10) + 1 });
        resolve({ gameName: gameName, userName:  userName, card: 0 });
      }, 1000); // Simulate 1 second delay
    });
  };
  
  export const logoutUser = () => {
    // Mock API call to log out the user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful logout
        resolve();
      }, 500); // Simulate 0.5 second delay
    });
  };
  