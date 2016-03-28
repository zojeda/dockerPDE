import fs = require("fs");
import path = require("path");
import readline = require("readline");
import proc = require("child_process");

import toComposeDefinition = require("./definitionTransformer");

let temp = require("temp");
var yalm = require("yamljs");

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
		//this.workspaceDefinition = fs.readFileSync(this.workspaceDefinitionPath).toJSON();
    this.toComposeDefinition();
    this.options = fs.exists(this.optionsPath) ? fs.readFileSync(this.optionsPath).toJSON() : {};
	}

	public start(response: Response<string, string>) {
		temp.open("dockerPDE-workspace", (err, info) => {
			if (!err) {
				fs.write(info.fd, yalm.stringify(this.composeDefinition));
				fs.close(info.fd, (err) => {
					console.log(info.path);
					let compose = proc.spawn("docker-compose", ["-f", info.path, "-p", this.id,  "up", "-d"]);
					const rl = readline.createInterface({
						input: compose.stderr
					});

					rl.on("line", (line) => {
						response.notification(line);
					});
					compose.on("error", (error) => {
						response.complete(error);
					});
					compose.on("close", () => {
						response.complete(null, "OK");
					});
				});
			}
		});
	}

	public stop(response: Response<string, string>) {
		temp.open("dockerPDE-workspace", (err, info) => {
			if (!err) {
				fs.write(info.fd, yalm.stringify(this.composeDefinition));
				fs.close(info.fd, (err) => {
					console.log(info.path);
					let compose = proc.spawn("docker-compose", ["-f", info.path, "-p", this.id,  "down"]);
					const rl = readline.createInterface({
						input: compose.stderr
					});

					rl.on("line", (line) => {
						response.notification(line);
					});
					compose.on("error", (error) => {
						response.complete(error);
					});
					compose.on("close", () => {
						response.complete(null, "OK");
					});
				});
			}
		});
	}

	private toComposeDefinition() {
		this.workspaceDefinition = {
      id: "sampleproject",
			development: {
				image: "zojeda/ts-dev",
				ports: [5858, 3000, 5000],
				code: "/sample-project",
				commands: {
					start: { description: "Start the application", style: "fa fa-play" },
					clean: { description: "Remove all dependencies and built assets", style: "fa fa-trash" },
					install: { description: "Install all dependencies", style: "fa fa-laptop"  }
				},
				tools: {
					cloud9: {
						image: "zojeda/ts-dev",
						command: "node /cloud9/server.js -w /sample-project",
						port: 8181,
						type: "web-app"
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
						type: "service"
					}
				}
			}

		};

    this.composeDefinition = toComposeDefinition(this.workspaceDefinition);
	}
}

export = Workspace;

