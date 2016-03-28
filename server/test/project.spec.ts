describe("prueba", ()=>{
	let proteusDefinition : ProjectDefinition = {
		name: "Proteus",
		workspacePath: __dirname + "../sample_project",
		devTools: [
			{"ts-dev-tools": {
				image: "zojeda/ts-dev-tools",
				ports: [3000, 5000]}
			},
			{"proteus-mongodb": {
				image: "mongo"}
			}
		]
	};

})