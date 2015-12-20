declare module dockerPDE {
	interface Container {
		name: string
		image: string
	}
	
	interface Command {
		name: string
		container: Container
		command: string
	}

	interface Definition{
		name: string
		containers: Container[]
	}
	
}