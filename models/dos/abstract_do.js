class AbstractDo {
    created_at = null;    // Date of account creation
    updated_at = null;    // Date of the last update
    is_active = false;     // Whether the user's account is active
};

// Export the UserDo object so it can be used in other files
module.exports = AbstractDo;