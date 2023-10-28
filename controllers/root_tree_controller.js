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
    const root = new TreeNode(0, { name: "Root" });
  
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
    { id: 1, name: "Node 1", parentId: null },
    { id: 2, name: "Node 2", parentId: 1 },
    { id: 3, name: "Node 3", parentId: 1 }
  ];
  
  // Function to print the tree
  function printTree(node, level = 0) {
    console.log(' '.repeat(level * 2) + `ID: ${node.id}, Name: ${node.data.name}`);
    for (const child of node.children) {
      printTree(child, level + 1);
    }
  }
  
  // Print the tree
  printTree(root);
  
  module.exports = {TreeNode, buildTree, printTree};