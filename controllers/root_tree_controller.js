class TreeNode {
    constructor(id, path, textInput = "") {
      this.id = id;
      this.path = path;
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
  
  function buildTree(data) {
    const dataMap = new Map();
    const root = new TreeNode(0, { name: "https://localhost:8080/api/hello" }, "Root text");
  
    data.forEach(nodeData => {
      const { id, name, parentId, textInput } = nodeData; // Include textInput in object destructuring
      const newNode = new TreeNode(id, { name }, textInput);
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
    { id: 1, name: "https://localhost:8080/api/hello/company-website", parentId: null, textInput: "<p>Text for Node 1</p>" },
    { id: 2, name: "https://localhost:8080/api/hello/company-website/cluster-yes", parentId: 1, textInput: "<p>Text for Node 2</p>" },
    { id: 3, name: "https://localhost:8080/api/hello/company-website/cluster-yes/domain-yes", parentId: 2, textInput: "<p>Text for Node 3</p>" },
    { id: 4, name: "https://localhost:8080/api/hello/company-website/cluster-yes/domain-no", parentId: 2, textInput: "<p>Text for Node 4</p>" },
    { id: 5, name: "https://localhost:8080/api/hello/company-website/cluster-no", parentId: 1, textInput: "<p>Text for Node 5</p>" },
    { id: 6, name: "https://localhost:8080/api/hello/company-website/cluster-no/another-provider-yes", parentId: 2, textInput: "<p>Text for Node 6</p>" },
    { id: 7, name: "https://localhost:8080/api/hello/company-website/cluster-no/another-provider-no", parentId: 2, textInput: "<p>Text for Node 7</p>" },
    { id: 8, name: "https://localhost:8080/api/hello/wordpress-shop", parentId: null, textInput: "<p>Text for Node 8</p>" },
    { id: 9, name: "https://localhost:8080/api/hello/kubernetes-education", parentId: null, textInput: "<p>Text for Node 9</p>" },
    { id: 10, name: "https://localhost:8080/api/hello/marketing", parentId: null, textInput: "<p>Text for Node 10</p>" },
    { id: 11, name: "https://localhost:8080/api/hello/cost-optimization", parentId: null, textInput: "<p>Text for Node 11</p>" },
    { id: 12, name: "https://localhost:8080/api/hello/publish-application", parentId: null, textInput: "<p>Text for Node 12</p>" },
    { id: 13, name: "https://localhost:8080/api/hello/organize-hackathon", parentId: null, textInput: "<p>Text for Node 13</p>" }
  ];
  
  const tree = buildTree(data);
  
  // Function to print the tree
  function printTree(node, level = 0) {
    console.log(' '.repeat(level * 2) + `ID: ${node.id}, Name: ${node.path.name}, Text Input: ${node.textInput}`);
    for (const child of node.children) {
      printTree(child, level + 1);
    }
  }
  
  // Print the tree
  printTree(tree);
  