interface ContainerDetails {
	image: string;
	volumes?: string[]
	ports?: (string|number)[]
}
interface DevTool {[name:string]:  ContainerDetails;}


interface User {
	name: string;
}

interface ProjectDefinition {
	id?: string;
	name: string;
	workspacePath: string;
	devTools: DevTool[];
}

interface Project {
	id?: string;
}