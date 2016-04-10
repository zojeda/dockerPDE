let oboe = require("oboe");

import "./workspace.css";

class WorkspaceController {
  workspaceUrl = "";
  status = "";
  definition = {};
  private progressInfo: string[];
  constructor($stateParams: ng.ui.IStateParamsService,
    private $http: ng.IHttpService,
    private workspaceBaseUrl: string,
    private $scope: ng.IScope) {
    this.workspaceUrl = `${workspaceBaseUrl}${$stateParams["userName"]}/${$stateParams["workspaceName"]}/`;
    this.refresh();
  }

  refresh() {
    this.workspaceGet("definition")
      .success((def) => this.definition = def)
      .catch(console.log);
    this.workspaceGet("status")
      .success((status: any) => this.status = status.result)
      .catch(console.log)
      .finally(() => {
        this.progressInfo = undefined;
        console.log("status : ", this.status);
      });
  }

  start() {
    oboe({ url: this.workspaceUrl + "start", method: "PUT" })
      .node("progress.*", (progress) => {
        this.showProgressInfo(progress.message);
      })
      .done((completed) => {
        console.log("completed : ", completed);
        this.refresh();
      });
  }
  stop() {
    oboe({ url: this.workspaceUrl + "stop", method: "PUT" })
      .node("progress.*", (progress) => {
        this.showProgressInfo(progress.message);
      })
      .done((completed) => {
        console.log("completed : ", completed);
        this.refresh();
      });
  }

  isDisabled(applicationName: string) {
    return !this.status;
  }

  private workspaceGet(resource: string) {
    return this.$http.get(this.workspaceUrl + resource);
  }

  private showProgressInfo(message: string) {
    if (!this.progressInfo) {
      this.progressInfo = [];
    }
    this.progressInfo.push(message);
    this.$scope.$apply();
  }
}

let workspace: angular.IComponentOptions = {
  controller: WorkspaceController,
  template: require("./workspace.html"),
  controllerAs: "workspace",
};


export default workspace;