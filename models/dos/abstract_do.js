class AbstractDo {
    constructor() {
        this.created_at = null;
        this.updated_at = null;
        this.is_active = false;
    }
}

// Export the UserDo object so it can be used in other files
module.exports = AbstractDo;