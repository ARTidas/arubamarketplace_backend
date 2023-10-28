class TreeNode {
    constructor(id, path) {
      this.id = id;
      this.path = path;
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

  //Function to build a new TreeNode object
  function buildTree(data) {
    const dataMap = new Map();
    const root = new TreeNode(0, { name: "https://localhost:8080/hello" });
  
    data.forEach(nodeData => {
      const { id, name, parentId } = nodeData;
      const newNode = new TreeNode(id, { name });
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

  /* Push back the paths */

  const data = [
    { id: 1, name: "https://localhost:8080/hello/company-website", parentId: null },
    { id: 2, name: "https://localhost:8080/hello/company-website/cluster-yes", parentId: 1 },
    { id: 3, name: "https://localhost:8080/hello/company-website/cluster-yes/domain-yes", parentId: 2 },
    { id: 4, name: "https://localhost:8080/hello/company-website/cluster-yes/domain-no", parentId: 2 },
    { id: 5, name: "https://localhost:8080/hello/company-website/cluster-no", parentId: 1 },
    { id: 6, name: "https://localhost:8080/hello/company-website/cluster-no/another-provider-yes", parentId: 2 },
    { id: 7, name: "https://localhost:8080/hello/company-website/cluster-no/another-provider-no", parentId: 2 },
    { id: 8, name: "https://localhost:8080/hello/wordpress-shop", parentId: null },
    { id: 9, name: "https://localhost:8080/hello/kubernetes-education", parentId: null },
    { id: 10, name: "https://localhost:8080/hello/marketing", parentId: null },
    { id: 11, name: "https://localhost:8080/hello/cost-optimization", parentId: null },
    { id: 12, name: "https://localhost:8080/hello/publish-application", parentId: null },
    { id: 13, name: "https://localhost:8080/hello/organize-hackathon", parentId: null }
  ];

  const tree = buildTree(data);
  
  // Function to print the tree
  function printTree(node, level = 0) {
    console.log(' '.repeat(level * 2) + `ID: ${node.id}, Name: ${node.path.name}`);
    for (const child of node.children) {
      printTree(child, level + 1);
    }
  }
  
  // Print the tree
  printTree(tree);
  
  module.exports = {TreeNode, buildTree, printTree};