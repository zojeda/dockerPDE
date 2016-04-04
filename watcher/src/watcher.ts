import fs = require("fs");
import Dockerode = require("dockerode");
import Handlebars = require("handlebars");

let dockerode = new Dockerode();

let templateSrc = fs.readFileSync(__dirname+"/../docker-pde-haproxy.hbs").toString();
let template = Handlebars.compile(templateSrc);
Handlebars.registerHelper("json", function(element) {
      return JSON.stringify(element || this, null, 2);
});

dockerode.listContainers((err, containers) => {
//  console.log(containers);
  let result = template({containers: containers});
  console.log(result);
});