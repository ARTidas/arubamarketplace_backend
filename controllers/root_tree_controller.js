class TreeNode {
    constructor(id, path,url_part = "", textInput = "") {
      this.id = id;
      this.path = path;
      this.url_part = url_part;
      this.textInput = textInput;
      this.children = [];
    }
  
    addChild(childNode) {
      this.children.push(childNode);
    }
  
    popChild(childId) {
      const index = this.children.findIndex(child => child.id === childId);
      if (index !== -1) {
        return this.children.splice(index, 1)[0];
      }
      return null; // Child with the specified ID not found
    }
  }

  function findNodeById(node, targetId) {
    if (node.id === targetId) {
      return node;
    }

    for (const child of node.children) {
      const result = findNodeById(child, targetId);
      if (result) {
        return result;
      }
    }
    return null;
  }
  
  function buildTree(data) {
    const dataMap = new Map();
    const root = new TreeNode(0, { name: "https://localhost:8080/api/hello" }, "", "Root text");
  
    data.forEach(nodeData => {
      const { id, name, url_part, parentId, textInput } = nodeData; // Include textInput in object destructuring
      const newNode = new TreeNode(id, { name }, url_part, textInput);
      dataMap.set(id, newNode);
  
      if (parentId === null) {
        root.addChild(newNode);
      } else {
        const parent = dataMap.get(parentId);
        if (parent) {
          parent.addChild(newNode);
        }
      }
    });
  
    return root;
  }
  
  const data = [
    { id: 1, name: "https://localhost:8080/api/hello/company-website", url_part: "company-website", parentId: null, textInput: "<p>Text for Node 1</p>" },
    { id: 2, name: "https://localhost:8080/api/hello/company-website/cluster-yes", url_part: "company-website/cluster-yes", parentId: 1, textInput: "<p>Text for Node 2</p>" },
    { id: 3, name: "https://localhost:8080/api/hello/company-website/cluster-yes/domain-yes", url_part: "company-website/cluster-yes/domain-yes", parentId: 2, textInput: "<p>Text for Node 3</p>" },
    { id: 4, name: "https://localhost:8080/api/hello/company-website/cluster-yes/domain-no", url_part: "company-website/cluster-yes/domain-no", parentId: 2, textInput: "<p>Text for Node 4</p>" },
    { id: 5, name: "https://localhost:8080/api/hello/company-website/cluster-no", url_part: "company-website/cluster-no", parentId: 1, textInput: "<p>Text for Node 5</p>" },
    { id: 6, name: "https://localhost:8080/api/hello/company-website/cluster-no/another-provider-yes", url_part: "company-website/cluster-no/another-provider-yes", parentId: 2, textInput: "<p>Text for Node 6</p>" },
    { id: 7, name: "https://localhost:8080/api/hello/company-website/cluster-no/another-provider-no", url_part: "company-website/cluster-no/another-provider-no", parentId: 2, textInput: "<p>Text for Node 7</p>" },
    { id: 8, name: "https://localhost:8080/api/hello/wordpress-shop", url_part: "wordpress-shop", parentId: null, textInput: "<p>Text for Node 8</p>" },
    { id: 9, name: "https://localhost:8080/api/hello/kubernetes-education", url_part: "kubernetes-education", parentId: null, textInput: "<p>Text for Node 9</p>" },
    { id: 10, name: "https://localhost:8080/api/hello/marketing", url_part: "marketing", parentId: null, textInput: "<p>Text for Node 10</p>" },
    { id: 11, name: "https://localhost:8080/api/hello/cost-optimization", url_part: "cost-optimization", parentId: null, textInput: "<p>Text for Node 11</p>" },
    { id: 12, name: "https://localhost:8080/api/hello/publish-application", url_part: "publish-application", parentId: null, textInput: "<p>Text for Node 12</p>" },
    { id: 13, name: "https://localhost:8080/api/hello/organize-hackathon", url_part: "organize-hackathon", parentId: null, textInput: "<p>Text for Node 13</p>" }
  ];
  
  const tree = buildTree(data);
  
  // Function to print the tree
  function printTree(node, level = 0) {
    console.log(' '.repeat(level * 2) + `ID: ${node.id}, Name: ${node.path.name}, URL PART: ${node.url_part}, Text Input: ${node.textInput}`);
    for (const child of node.children) {
      printTree(child, level + 1);
    }
  }
  
  // Print the tree
  printTree(tree);
  