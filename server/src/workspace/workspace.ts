import fs = require("fs");
import path = require("path");
import readline = require("readline");
import proc = require("child_process");

import toComposeDefinition = require("./definitionTransformer");

let temp = require("temp");
let yalm = require("yamljs");
let mergeStream = require("merge-stream");

class Workspace {
  public workspaceDefinition: WorkspaceDefinition;
  private baseDir: string;
  private workspaceDefinitionPath: string;
  private optionsPath: string;
  private options: string;
  private composeDefinition: any;

  constructor(private id) {
    this.baseDir = path.join(__dirname, "..", "data", "workspaces", id);
    this.workspaceDefinitionPath = path.join(this.baseDir, "definition.json");
    this.optionsPath = path.join(this.baseDir, "options");
    this.initialize();
  }

  private initialize() {
    // this.workspaceDefinition = fs.readFileSync(this.workspaceDefinitionPath).toJSON();
    this.toComposeDefinition();
    this.options = fs.exists(this.optionsPath) ? fs.readFileSync(this.optionsPath).toJSON() : {};
  }

  public start(response: Response<string, string>) {
    this.spawnComposeProcess(["up", "-d"], response);
  }

  public stop(response: Response<string, string>) {
    this.spawnComposeProcess(["down"], response);
  }

  public status(response: Response<string, string>) {
    this.spawnComposeProcess(["ps", "-q"], response);
  }

  private spawnComposeProcess(command: string[], response: Response<string, string>) {
    temp.open("dockerPDE-workspace", (err, info) => {
      if (!err) {
        fs.write(info.fd, yalm.stringify(this.composeDefinition));
        fs.close(info.fd, (err) => {
          console.log(info.path);
          let args: string[] = ["-f", info.path, "-p", this.id];
          args = args.concat(command);
          console.log(`docker-compose ${args.join(" ")}`);
          let compose = proc.spawn("docker-compose", args);
          let stdoutAndError = mergeStream();
          stdoutAndError.add(compose.stderr);
          stdoutAndError.add(compose.stdout);

          var responseContent = "";
          const rl = readline.createInterface({
            input: stdoutAndError
          });

          rl.on("line", (line) => {
            response.progress(line);
            responseContent += line + "\\n";
          });
          compose.on("error", (error) => {
            response.complete(error);
          });
          compose.on("close", (code) => {
            console.log(code);
            if (code) {
              response.complete(new Error(`error code[${code}]`));
            } else {
              response.complete(null, responseContent);
            }
          });
        });
      }
    });
  }
  private toComposeDefinition() {
    this.workspaceDefinition = {
      development: {
        image: "zojeda/ts-dev",
        ports: [5858, 3000, 5000],
        code: "/sample-project",
        commands: {
          start: { description: "Start the application", style: "fa fa-play" },
          clean: { description: "Remove all dependencies and built assets", style: "fa fa-trash" },
          install: { description: "Install all dependencies", style: "fa fa-laptop" }
        },
        tools: {
          cloud9: {
            command: "node /cloud9/server.js --listen 0.0.0 -a : -w /sample-project",
            description: "Cloud9 IDE",
            icon: "<i class=\"{{details.style}}\"></i>",
            port: 8181,
            type: "web-application"
          },
          // ungit: {
          // 	image: "zojeda/ts-dev",
          // 	command: "ungit --port=8181 /sample-project",
          // 	port: 8181,
          // 	type: "web-app"
          // }
        },
        services: {
          mymongodb: {
            image: "mongo",
            port: 27017,
            type: "tcp-service"
          }
        }
      }

    };

    this.composeDefinition = toComposeDefinition(this.id, this.workspaceDefinition);
  }
}

export = Workspace;