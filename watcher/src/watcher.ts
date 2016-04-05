import fs = require("fs");
import Dockerode = require("dockerode");
import Handlebars = require("handlebars");

let dockerode = new Dockerode();

let templateSrc = fs.readFileSync(__dirname + "/../docker-pde-haproxy.hbs").toString();
let template = Handlebars.compile(templateSrc);
Handlebars.registerHelper("json", function(element) {
  return JSON.stringify(element || this, null, 2);
});
Handlebars.registerHelper("if_eq", function(a, b, opts) {
  if (a == b) {// Or === depending on your needs
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});
dockerode.listContainers((err, containers) => {
  let result = template({ containers: containers });
  console.log(result);
});