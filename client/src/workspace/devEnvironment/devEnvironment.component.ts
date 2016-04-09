import "font-awesome/less/font-awesome.less";
import "./devEnvironment.css";

class DevEnvironment { };

let devEnvironment: angular.IComponentOptions = {
  controller: DevEnvironment,
  template: require("./devEnvironment.html"),
  controllerAs: "dev",
  bindings: {
    environment: "=",
    disabled: "="
  }
};


export default devEnvironment;