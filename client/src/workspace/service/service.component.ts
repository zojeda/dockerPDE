import "font-awesome/less/font-awesome.less";
import "./service.css";

class ServiceController {};

let service: angular.IComponentOptions = {
  controller: ServiceController,
  template: require("./service.html"),
  controllerAs: "serviceCtrl",
  bindings: {
    service: "=",
    name: "=",
    disabled: "="
  }
};


export default service;