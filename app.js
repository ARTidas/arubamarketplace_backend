const express = require('express');
const app = express();
const userController = require('./controllers/user_controller');
const userDo = require('./models/dos/user_do');
const productController = require('./controllers/product_controller');
const userRegistrationController = require('./controllers/user_registration_controller');
const rootTreeController = require('./controllers/root_tree_controller');

const cors = require('cors');

// Engedélyezd a CORS-t a megfelelő eredettel (frontend eredetével)
app.use(cors({
  origin: 'http://localhost:4200', // Itt add meg a frontend URL-jét
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Az alkalmazás fut a ${port} porton.`);
});

app.use('/api', userController); // Az '/api' útvonal alatt érhető el
app.use('/api', productController);
app.use('/api/user', userRegistrationController);
app.get('/api/hello/:id', async (req, res) => {
  const { id } = req.params; // Extract the node ID from the URL

  const data = [
    { id: 1, name: "https://localhost:8080/api/hello/1", url_part: "company-website", parentId: null, textInput: "<p>Text for Node 1</p>" },
    { id: 2, name: "https://localhost:8080/api/hello/2", url_part: "company-website/cluster-yes", parentId: 1, textInput: "<p>Text for Node 2</p>" },
    { id: 3, name: "https://localhost:8080/api/hello/3", url_part: "company-website/cluster-yes/domain-yes", parentId: 2, textInput: "<p>Text for Node 3</p>" },
    { id: 4, name: "https://localhost:8080/api/hello/4", url_part: "company-website/cluster-yes/domain-no", parentId: 2, textInput: "<p>Text for Node 4</p>" },
    { id: 5, name: "https://localhost:8080/api/hello/5", url_part: "company-website/cluster-no", parentId: 1, textInput: "<p>Text for Node 5</p>" },
    { id: 6, name: "https://localhost:8080/api/hello/6", url_part: "company-website/cluster-no/another-provider-yes", parentId: 2, textInput: "<p>Text for Node 6</p>" },
    { id: 7, name: "https://localhost:8080/api/hello/7", url_part: "company-website/cluster-no/another-provider-no", parentId: 2, textInput: "<p>Text for Node 7</p>" },
    { id: 8, name: "https://localhost:8080/api/hello/8", url_part: "wordpress-shop", parentId: null, textInput: "<p>Text for Node 8</p>" },
    { id: 9, name: "https://localhost:8080/api/hello/9", url_part: "kubernetes-education", parentId: null, textInput: "<p>Text for Node 9</p>" },
    { id: 10, name: "https://localhost:8080/api/hello/10", url_part: "marketing", parentId: null, textInput: "<p>Text for Node 10</p>" },
    { id: 11, name: "https://localhost:8080/api/hello/11", url_part: "cost-optimization", parentId: null, textInput: "<p>Text for Node 11</p>" },
    { id: 12, name: "https://localhost:8080/api/hello/12", url_part: "publish-application", parentId: null, textInput: "<p>Text for Node 12</p>" },
    { id: 13, name: "https://localhost:8080/api/hello/13", url_part: "organize-hackathon", parentId: null, textInput: "<p>Text for Node 13</p>" }
  ];

  const tree = buildTree(data);

  try {
    const node = await findNodeById(tree, id);
    //console.log(id);
    //console.log(tree);
    console.log(node);


    // Send the node as a JSON response
    res.json(node);
  } catch (err) {
    console.error('Hiba a node keresése során:', err);
    res.status(500).json({ error: 'Hiba a keresés során' });
  }
});

console.log(JSON.stringify(userDo.users, null, 2));
console.log(JSON.stringify(userDo.users, null, 2));

function findNodeById(node, targetId) {
  if (node.id == targetId) {
    return node;
  }

  //console.log(node.children);
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

  const root = new TreeNode(0, { name: "https://localhost:8080/api/hello/0" }, "", "Root text");

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