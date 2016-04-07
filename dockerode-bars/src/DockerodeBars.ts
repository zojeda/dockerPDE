import Docker = require("dockerode");
import Handlebars = require("handlebars");

import fs = require("fs");


Handlebars.registerHelper("json", function(element) {
  return JSON.stringify(element || this, null, 2);
});
Handlebars.registerHelper("if_eq", function(a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

interface DockerEvent {
  Action: string;
  Type: "image" | "container" | "network";
  Actor: {
    "Id": string,
    "Attributes": any
  }
  time: number;
  timeNano: number;
}



class DockerBars {
  dockerode: Docker;
  template: HandlebarsTemplateDelegate;
  lastGeneration: string = undefined;
  lastGenerationTime: number = undefined;

  constructor(private configuration: DockerodeBarsOptions) {
    this.dockerode = new Docker(configuration.dockerHost);
    this.template = Handlebars.compile(configuration.template);

    if (this.configuration.watch) {
      this.dockerode.getEvents({ filters: this.configuration.watchFilter }, (err, eventsStream) => {
        if (!err) {
          eventsStream.on("data", () => setTimeout(this.generate.bind(this), 3000));
        }
      });
    }

  }

  generate() {
    this.dockerode.listContainers(this.configuration.listOptions, (err, containers) => {
      let result = this.template({ containers: containers });
      if (!this.lastGeneration || this.lastGeneration !== result) {
        console.log("generating ....");
        this.lastGeneration = result;
        this.lastGenerationTime = new Date().getTime();
        if (this.configuration.outputPath) {
          fs.writeFile(this.configuration.outputPath, result, (err) => {
            if (err) {
              console.error(err);
            } else {
              this.dockerode.listContainers({
                filters: {
                  label: [this.configuration.container]
                }
              }, (err, containersInfo) => {
                containersInfo.forEach(containerInfo => {
                    console.log("restarting container : ", containerInfo.Names);
                    this.dockerode.getContainer(containerInfo.Id).restart( err => {
                      if (err) {
                        console.error(err);
                    }});
                });
              });
            }
          });
        } else {
          console.log(result);
        }
      }
    });
  }
}

export = DockerBars;

