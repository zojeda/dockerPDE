import express = require("express");
import Workspace = require("./workspace");

let workspaceRouter: express.Router = express.Router();


interface WorkspaceRequest extends express.Request {
  workspace: Workspace;
}

workspaceRouter.param("id", (request, response, next, workspaceId) => {
  let user = request.user;
  let workspace = new Workspace(user.id + workspaceId);
  request["workspace"] = workspace;
  next();
});

workspaceRouter.get("/:id", (request, response) => {
  let workspace: Workspace = request["workspace"];
  response.send(workspace.workspaceDefinition);
});
workspaceRouter.put("/:id/start", (request, response) => {
  let workspace: Workspace = request["workspace"];
  workspace.start(createResponseHandler(response));
});
workspaceRouter.put("/:id/stop", (request, response) => {
  let workspace: Workspace = request["workspace"];
  workspace.stop(createResponseHandler(response));
});

function createResponseHandler(response: express.Response) {
  response.set({"Content-Type": "application/json"});
  response.write(`{ "progress": [`);
  return {
    complete: (error, result) => {
      if (error) {
        response.write(`{"message": "completed!!"}], {"error": "${error}"}}`);
        response.status(500).end();
      } else {
        response.write(`{"message": "completed!!"}], {"result": "${result}"}}`);
        response.status(200).end();
      }
    },
    progress: (message) => {
      console.log(message);
      response.write(`{"message": "${message}"},`);
    }
  }
};


export = workspaceRouter;