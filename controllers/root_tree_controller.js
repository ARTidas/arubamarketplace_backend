class TreeNode {
    constructor(id, data) {
      this.id = id;
      this.data = data;
      this.children = [];
    }
  
    addChild(childNode) {
      this.children.push(childNode);
    }
  }
  
  // Example usage:
  const root = new TreeNode(1, { name: 'Root Node' });
  
  // Add child nodes
  const child1 = new TreeNode(2, { name: 'Child 1' });
  const child2 = new TreeNode(3, { name: 'Child 2' });
  
  root.addChild(child1);
  root.addChild(child2);
  
  // Add more child nodes
  const grandchild1 = new TreeNode(4, { name: 'Grandchild 1' });
  const grandchild2 = new TreeNode(5, { name: 'Grandchild 2' });
  
  child1.addChild(grandchild1);
  child1.addChild(grandchild2);
  
  // Function to print the tree
  function printTree(node, level = 0) {
    console.log(' '.repeat(level * 2) + `ID: ${node.id}, Name: ${node.data.name}`);
    for (const child of node.children) {
      printTree(child, level + 1);
    }
  }
  
  // Print the tree
  printTree(root);
  