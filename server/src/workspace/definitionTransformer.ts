function toComposeDefinition(workspaceId: string, workspaceDefinition: WorkspaceDefinition) {
  let composeServices: any = {};
  let composeDefinitions: any = {
    version: "2",
    services: composeServices,
    networks: {
      "docker-pde": {
        external: {
          name: "dockerpde_default"
        }
      }
    }
  };
  let workspaceDev = workspaceDefinition.development;
  composeServices.development = {
    image: workspaceDev.image,
    command: workspaceDev.command ? workspaceDev.command : "tail -f /dev/null",
    ports: getPorts(workspaceDev.ports),
  };
  composeServices.ssh_development = {
    image: "jeroenpeeters/docker-ssh",
    volumes: ["/var/run/docker.sock:/var/run/docker.sock"],
    ports: ["22", "8022"],
    environment: {
      CONTAINER: workspaceId + "_development_1",
      AUTH_MECHANISM: "noAuth"
    },
    networks: getNetworks("ssh.development", workspaceId),
    labels: getLabels("ssh.development", workspaceId, "tcp-service", "web.ssh"),
  };
  Object.keys(workspaceDev.tools).forEach(tool => {
    composeServices["development_tool_" + tool] = getApplication(tool,  workspaceId, workspaceDev.tools[tool], workspaceDev.image);
  });
  Object.keys(workspaceDev.services).forEach(service => {
    composeServices["development_service_" + service] = getApplication(service,  workspaceId, workspaceDev.services[service], workspaceDev.image);
    composeServices["ssh.development_service_" + service] = {
      image: "jeroenpeeters/docker-ssh",
      volumes: ["/var/run/docker.sock:/var/run/docker.sock"],
      ports: ["22", "8022"],
      environment: {
        CONTAINER: workspaceId + "ssh.development_service_" + service + "_1",
        AUTH_MECHANISM: "noAuth"
      },
      networks: getNetworks("ssh.development", workspaceId),
      labels: getLabels("ssh.development_service_" + service, workspaceId, "tcp-service", "web.ssh"),
    };
  });

  return composeDefinitions;
}


function getApplication(applicationName: string, workspaceId: string, application: ApplicationDefinition, defaultImage: string) {
  let composeApplication: any = {
    ports: getPorts(application.port),
    labels: getLabels(applicationName, workspaceId, application.type),
    networks: getNetworks(applicationName, workspaceId)
  };
  if (application.image) {
    composeApplication.image = application.image;
  } else {
    composeApplication.image = defaultImage;
  }
  if (application.command) {
    composeApplication.command = application.command;
  }
  return composeApplication;
}

function getPorts(ports) {
  let resultPorts = [];
  if (ports.constructor === Array) {
    ports.forEach((port) => resultPorts.push(port.toString()));
  } else {
    resultPorts.push(ports.toString());
  }
  return resultPorts;
}

function getNetworks(host: string, workspaceId: string) {
  let networks = {
    "docker-pde": {
      "aliases": [`${host}.${workspaceId}`]
    }
  };
  return networks;
}

function getLabels(host: string, workspaceId: string, type: string, extraTag?: string) {
  let labels = {
    "dockerpde.name": `${host}.${workspaceId}`,
    "dockerpde.application.type": type
  };
  if(extraTag) {
    labels["dockerpde.tag"]=extraTag;
  }
  return labels;
}
export = toComposeDefinition;