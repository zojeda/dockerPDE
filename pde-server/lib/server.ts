import Docker = require("dockerode");
var docker = new Docker();



docker.createContainer({name: "prueba", Image: "node", Cmd: "ls"}, (error, container) => {
	if(error) {
		throw "error creating container ", error;
	}
	container.start((error) => {
		if(error) {
			throw "error starting container ", error;
		}
		container.logs({stdout: true}, (err, stream) => {
			if(error) {
				throw "error logs container ", error;
			}
			stream.pipe(process.stdout);
		});
	});
});
