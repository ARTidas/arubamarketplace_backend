const AbstractDo = require("./abstract_do");

class Installation extends AbstractDo {
    constructor(id, userId, nodeId, status, version) {
        this.id = id;
        this.userId = userId;
        this.nodeId = nodeId;
        this.status = status;
        this.version = version;
    }
}

module.exports = Installation;