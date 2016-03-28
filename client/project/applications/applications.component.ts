import "./applications.css";


class ApplicationsController {};

let applications: angular.IComponentOptions = {
	controller: ApplicationsController,
	template: require("./applications.html"),
	controllerAs: "aps",
};


export default applications;