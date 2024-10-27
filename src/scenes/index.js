// Import the different scene modules
const echoScene = require("./echo"); // Import the echo scene
const greeterScene = require("./greeter"); // Import the greeter scene
const superWizard = require("./super-wizard"); // Import the super-wizard scene

// Export the imported scenes as a module
module.exports = {
    superWizard, // Export the super-wizard scene
    echoScene,   // Export the echo scene
    greeterScene // Export the greeter scene
};
