import Workspace = require("./workspace");

let workspace = new Workspace("sample_project");
workspace.start({
  complete: console.log,
  progress: console.log
});

