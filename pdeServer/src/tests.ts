import * as fs from 'fs';


let Docker = require('dockerode');
var docker = new Docker();



var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var ss = require('socket.io-stream');

app.listen(9090)

io.on('connection', function(socket){
        console.log('neue Socket-Connection');
        socket.on('event', function(data){});
        socket.on('disconnect', function(){});
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


var container;


io.of('pty').on('connection', function(socket) {
	// receives a bidirectional pipe from the client see index.html
	// for the client-side
	ss(socket).on('new', function(stream, options) {
		console.log("new connection")
		var name = options.name;

		let logs_opts = {
			follow: true,
			stdout: true,
			stderr: true,
			timestamps: true
		};

		container.exec({Cmd: ['/usr/bin/zsh'],
		AttachStdin: true,
		AttachStdout: true,
		AttachStderr: true,
		Tty: true
		}, (err, exec) => {
				exec.start({Detach: false, Tty: true, hijack: true, stdin: true}, (execErr, execStream) => {
					execStream.pipe(stream).pipe(execStream);
				});
		})
		socket.on('disconnect', function() {
			console.log("end");
		});
	});
});

docker.createContainer({
	Image: 'zojeda/node-dev-env',
	name: 'prueba',
	AttachStdin: false,
	AttachStdout: true,
	AttachStderr: true,
	Tty: true,
	Cmd: ['/bin/bash', '-c', 'while sleep 1; do echo "$(tput setaf 1)date $(tput setaf 7): $(tput setaf 6)$(date)$(tput setaf 7)"; done'],
	OpenStdin: false,
	StdinOnce: false
}, function(err, containerInfo) {
	if (err) console.error(err);
	else {
		container = docker.getContainer(containerInfo.id);


		container.start(function (err, data) {
			console.log("starting .......")
			console.log(data);

		});



	}
});