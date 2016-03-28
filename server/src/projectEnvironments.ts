import proc = require("child_process");
import fs = require("fs");
var temp = require("temp");
var yalm = require("yamljs");


let sampleProject = {
  version: "2",
  services: {
    "dev": {
      image: "node",
      command: "tail -f /dev/null"
    },
    "ssh_dev": {
      image: "jeroenpeeters/docker-ssh",
      volumes: ["/var/run/docker.sock:/var/run/docker.sock"],
      ports: ["22", "8022"],
      environment: {
        CONTAINER: "zacaproteus_dev_1",
        AUTH_MECHANISM: "noAuth"
      }
    },
    "proteus_mongodb": {
      image: "mongo",
      ports: ["27017"],
    },
    "ssh_proteus_mongodb": {
      image: "jeroenpeeters/docker-ssh",
      volumes: ["/var/run/docker.sock:/var/run/docker.sock"],
      ports: ["22", "8022"],
      environment: {
        CONTAINER: "zacaproteus_proteus_mongodb_1",
        AUTH_MECHANISM: "noAuth"
      }
    },
    "other_mongodb": {
      image: "mongo",
      ports: ["27017"],
    },
    "sshpiperd": {
      image: "farmer1992/sshpiperd",
      ports: ["2222:2222"],
      volumes: [
        `${__dirname}/sshpiperd:/var/sshpiper`,
        "/etc/ssh/ssh_host_rsa_key:/etc/ssh/ssh_host_rsa_key"
      ]
    },
    "nginx": {
      image: "nginx",
      ports: ["8080:80", "27017:27017"],
      volumes: [
        `${__dirname}/nginx/nginx.conf:/etc/nginx/nginx.conf:ro`,
        `${__dirname}/nginx/conf.d:/etc/nginx/conf.d:ro`
      ]
    }
  }
};


// Automatically track and cleanup files at exit
//temp.track();

// Process the data (note: error handling omitted)
temp.open("composeEnvironment", function(err, info) {
  if (!err) {
    fs.write(info.fd, yalm.stringify(sampleProject));
    fs.close(info.fd, function(err) {
      console.log(info.path);
      let compose = proc.spawn("docker-compose", ["-f", info.path, "-p", "zaca@proteus", "up", "-d"]);
      compose.stdout.pipe(process.stdout);
      compose.stderr.pipe(process.stderr);
    });
  }
});