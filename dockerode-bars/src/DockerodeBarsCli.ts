import fs = require("fs");
import DockerodeBars = require("./DockerodeBars");

let argv = require("yargs")
  .usage("$0 [options] -s <templatePath> [-o destination]")
  .option("templatePath", {
    alias: "s",
    describe: "handlebars template to use ",
    demand: true
  })
  .option("destination", {
    alias: "o",
    describe: "file generation results path"
  })
  .option("watch", {
    alias: "w",
    describe: "watch for docker events and rerun the file generation",
    default: false
  })
  .option("dockerHost", {
    alias: "d",
    describe: "watch for docker events and rerun the file generation (JSON format)",
    default: `{"socketPath": "/var/run/docker.sock"}`
  })
  .option("watchFilter", {
    alias: "wf",
    describe: "watch filter for docker events and rerun the file generation (JSON format)",
    default: `{"type": ["container"], "event": ["start", "stop"]}`
  })
  .option("container", {
    alias: "c",
    describe: "label based filter to restart containers after file generation",
    default: undefined
  })

  .option("configuration", {
    alias: "c",
    describe: "configuration file[TODO: not implemented yet!!!]",
  })
  .help()
  .argv;

let options: DockerodeBarsOptions = {
  dockerHost: JSON.parse(argv.dockerHost),
  template: fs.readFileSync(argv.templatePath).toString(),
  outputPath: argv.destination,
  watch: argv.watch,
  watchFilter: JSON.parse(argv.watchFilter),
  container: argv.container,
};


let dockerodeBars = new DockerodeBars(options);
dockerodeBars.generate();



