var io = require('socket.io-client');
var ss = require('socket.io-stream');
var Terminal = require('terminal.js');

export default class LogViewerDirective implements ng.IDirective {
    restrict = 'E';
    template = require('./logViewer.html');
    scope = {};
    link = function(scope, elem, attrs) {
      let socket = io(location.origin + '/pty');
      this.term = new Terminal({columns: 80, rows: 24});
      let stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});
      // Send stream and options to the server
      ss(socket).emit('new', stream, {columns: 80, rows: 24});
      
      // Connect everything up  
      stream.pipe(this.term).dom(elem[0]).pipe(stream);
    }
    static instance = () => new LogViewerDirective();
}



