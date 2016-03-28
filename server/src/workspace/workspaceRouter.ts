import express = require("express");
import Workspace = require("./workspace");

let workspaceRouter : express.Router = express.Router();


interface WorkspaceRequest extends express.Request {
	workspace: Workspace;
}

workspaceRouter.param("id", (request, response, next, id) => {
	let workspace = new Workspace(id);
	request["workspace"] = workspace;
  next();
});

workspaceRouter.get("/:id", (request, response) => {
  let workspace : Workspace = request["workspace"];
	response.send(workspace.workspaceDefinition);
});
workspaceRouter.put("/:id/start", (request, response) => {
  let workspace : Workspace = request["workspace"];
  workspace.start({
    complete: (error, result) => {
      if(error) {
        response.send(500, error);
      } else {
        response.write(result);
        response.status(200).end();
      }
    },
    notification: (message) => {
      console.log(message);
      response.write(message);
    }
  });
});

workspaceRouter.put("/:id/stop", (request, response) => {
  let workspace : Workspace = request["workspace"];
  workspace.stop({
    complete: (error, result) => {
      if(error) {
        response.send(500, error);
      } else {
        response.write(result);
        response.status(200).end();
      }
    },
    notification: (message) => {
      console.log(message);
      response.write(message);
    }
  });
});


export = workspaceRouter;