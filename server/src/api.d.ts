interface Response<T, N> {
	complete: (error: Error, response?: T) => void;
	notification?: (N) => void;
}

interface CommandDefinition {
	description: string;
	style: string;
}
interface ApplicationDefinition {
	image: string;
	command?: string;
	port: number;
	type: "service" | "web-app";
}

interface DevelopmentEnvironment {
	image: string;
	ports: number[];
	code: string;
  command?: string;	commands: {[name: string]: CommandDefinition };
	tools: {[name: string]: ApplicationDefinition };
	services: {[name: string]: ApplicationDefinition };
}

interface WorkspaceDefinition {
  id: string;
	development: DevelopmentEnvironment;
}

interface User {
	id: string;
	workspaces: WorkspaceDefinition[];
}



interface ProjectDefinition {
	id?: string;
	name: string;
}

