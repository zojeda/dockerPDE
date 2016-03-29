  function toComposeDefinition(workspaceId: string, workspaceDefinition: WorkspaceDefinition) {
  let composeDefinition: any = {};
  let workspaceDev = workspaceDefinition.development;
  composeDefinition.development = {
    image: workspaceDev.image,
    command: workspaceDev.command ? workspaceDev.command : "tail -f /dev/null",
    ports: getPorts(workspaceDev.ports),
  };
  composeDefinition.ssh_development = {
    image: "jeroenpeeters/docker-ssh",
    volumes: ["/var/run/docker.sock:/var/run/docker.sock"],
    ports: ["22", "8022"],
    environment: {
      CONTAINER: workspaceId + "_development_1",
      AUTH_MECHANISM: "noAuth"
    }
  };
  Object.keys(workspaceDev.tools).forEach(tool => {
    composeDefinition["development_tool_" + tool] = getApplication(workspaceDev.tools[tool]);
  });
  Object.keys(workspaceDev.services).forEach(service => {
    composeDefinition["development_service_" + service] = getApplication(workspaceDev.services[service]);
  });

  return composeDefinition;
}


function getApplication(application: ApplicationDefinition) {
  let composeApplication: any = {
    image: application.image,
    ports: getPorts(application.port)
  };
  if(application.command) {
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


export = toComposeDefinition;