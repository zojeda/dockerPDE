import express = require("express");


import workspaceRouter = require("./workspace/workspaceRouter");




class UserImpl implements User {
 workspaces: WorkspaceDefinition[] = [];
 constructor(public id: string) {
		console.log("my name id is :", this.id);
	}
}

let userRouter : express.Router = express.Router();

userRouter.param("id", (req, res, next, id) => {
	req.user = new UserImpl(id);
	next();
});

userRouter.get("/:id", (req, response) => {
	response.send(`user id: ${req.params.id}`);
});

userRouter.use("/:id/", workspaceRouter);


export = userRouter;