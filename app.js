const express = require('express');
const app = express();
const userController = require('./controllers/user_controller');
const userDo = require('./models/dos/user_do');
const productController = require('./controllers/product_controller');
const userRegistrationController = require('./controllers/user_registration_controller');
const userLoginController = require('./controllers/user_login_controller');
const rootTreeController = require('./controllers/root_tree_controller');
const applicationInstallController = require('./controllers/application_install_controller');
const clickController = require('./controllers/click_controller');
const bodyParser = require('body-parser');

const cors = require('cors');

// Engedélyezd a CORS-t a megfelelő eredettel (frontend eredetével)
app.use(cors({
  origin: 'http://localhost:4200', // Itt add meg a frontend URL-jét
}));

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Az alkalmazás fut a ${port} porton.`);
});

app.use(bodyParser.json());
app.use('/api', userController); // Az '/api' útvonal alatt érhető el
app.use('/api', productController);
app.use('/api/registration', userRegistrationController);
app.use('/api/userlogin', userLoginController);
app.use('/api', applicationInstallController);
app.use('/api/click', clickController);
app.get('/api/hello/:id', async (req, res) => {

  /* MAKE DATABASE HERE */
  //id, user_id, node_id, status, version

  const { id } = req.params; // Extract the node ID from the URL

  const data = [
    { id: 1, name: "https://localhost:80/api/hello/1", url_part: "company-website", parentId: null, textInput: "Do you have an Aruba Kubernetes cluster for your project?",
    decisions: [
            { decision: "Yes", children_id: 2 },
            { decision: "No", children_id: 5 }
        ]
    },
    { id: 2, name: "https://localhost:80/api/hello/2", url_part: "company-website/cluster-yes", parentId: 1, textInput: "Do you have a domain name?",
    decisions: [
            { decision: "Yes", children_id: 3 },
            { decision: "No", children_id: 4 }
        ]
    },
    { id: 3, name: "https://localhost:80/api/hello/3", url_part: "company-website/cluster-yes/domain-yes", parentId: 2, textInput: "I am ready to install everything for you. Would you like to pay with credit card or crypto?", decisions: [] },
    { id: 4, name: "https://localhost:80/api/hello/4", url_part: "company-website/cluster-yes/domain-no", parentId: 2, textInput: "Would you like to have one?", decisions: [] },
    { id: 5, name: "https://localhost:80/api/hello/5", url_part: "company-website/cluster-no", parentId: 1, textInput: "Do you have a Kubernetes cluster at another provider?",
    decisions: [
        { decision: "Yes", children_id: 6 },
        { decision: "No", children_id: 7 }
    ]
    },
    { id: 6, name: "https://localhost:80/api/hello/6", url_part: "company-website/cluster-no/another-provider-yes", parentId: 2, textInput: "Would you like to compute which is more beneficial?", decisions: [] },
    { id: 7, name: "https://localhost:80/api/hello/7", url_part: "company-website/cluster-no/another-provider-no", parentId: 2, textInput: "", decisions: [] },
    { id: 8, name: "https://localhost:80/api/hello/8", url_part: "wordpress-shop", parentId: null, textInput: "", decisions: [] },
    { id: 9, name: "https://localhost:80/api/hello/9", url_part: "kubernetes-education", parentId: null, textInput: "", decisions: [] },
    { id: 10, name: "https://localhost:80/api/hello/10", url_part: "marketing", parentId: null, textInput: "", decisions: [] },
    { id: 11, name: "https://localhost:80/api/hello/11", url_part: "cost-optimization", parentId: null, textInput: "", decisions: [] },
    { id: 12, name: "https://localhost:80/api/hello/12", url_part: "publish-application", parentId: null, textInput: "", decisions: [] },
    { id: 13, name: "https://localhost:80/api/hello/13", url_part: "organize-hackathon", parentId: null, textInput: "", decisions: [] }
  ];

  console.log(data);

  const tree = buildTree(data);

  try {
    const node = await findNodeById(tree, id);

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
    constructor(id, path,url_part = "", textInput = "", decisions, commands) {
      this.id = id;
      this.path = path;
      this.url_part = url_part;
      this.textInput = textInput;
      this.decisions = decisions;
      this.commands = commands;
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

  const root = new TreeNode(0, { name: "https://localhost:80/api/hello/0" }, "", "Hello, I am Amedeo, the Aruba AI assistant. What technological challenges can I help with?",
  [
      { decision: "Hello there Amedeo, I would like to have a company website", children_id: 1 },
      { decision: "I would like to have a Wordpress shop", children_id: 8 },
      { decision: "I would like to learn more about Kubernetes", children_id: 9 },
      { decision: "I would like to increase my sales number", children_id: 10 },
      { decision: "I would like to optimize my IT infrastructure cost", children_id: 11 },
      { decision: "I would like to publish an application", children_id: 12 },
      { decision: "I would like to organize a Kubernetes Hackathon", children_id: 13 }
  ]
);

  data.forEach(nodeData => {
    const { id, name, url_part, parentId, textInput, decisions } = nodeData; // Include textInput in object destructuring
    const newNode = new TreeNode(id, { name }, url_part, textInput, decisions);
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