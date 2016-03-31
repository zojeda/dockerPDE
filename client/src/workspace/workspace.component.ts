class WorkspaceController {
  workspaceUrl = "";
  status = "";
  definition = {};
  constructor($stateParams: ng.ui.IStateParamsService, private $http: ng.IHttpService, private workspaceBaseUrl: string) {
    this.workspaceUrl = `${workspaceBaseUrl}${$stateParams["userName"]}/${$stateParams["workspaceName"]}/`;
    this.init();
  }

  init() {
    this.workspaceGet("definition")
      .success((def) => this.definition=def)
      .catch(console.log);
    this.workspaceGet("status")
      .success((status: any) => this.status=status.result)
      .catch(console.log);
  }

  workspaceGet(resource: string) {
    return this.$http.get(this.workspaceUrl+resource);
  }

	project = {
		devEnvironment: {
			commands: {
				start: { description: "Start the application", style: "fa fa-play" },
				clean: { description: "Remove all dependencies and built assets", style: "fa fa-trash" },
				install: { description: "Install all dependencies", style: "fa fa-laptop"  }
			}
		}
	};
}

let workspace: angular.IComponentOptions = {
	controller: WorkspaceController,
	template: require("./workspace.html"),
	controllerAs: "workspace",
};


export default workspace;