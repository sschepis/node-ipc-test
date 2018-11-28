const ipc = require('node-ipc')
const abiDecoder = require('abi-decoder');

ipc.config.logInColor      = true;
ipc.config.logDepth        = 0;
ipc.config.logger          = console.log;
ipc.config.silent          = true;

ipc.serve('/tmp/app.syseth', () => {
    ipc.server.on('decodeInput',
    function(data,socket){
        data = data.split('|||');
        abiDecoder.addABI(JSON.parse(data[0]));
        const decodedData = abiDecoder.decodeMethod(data[1]);
        ipc.server.emit(
            socket,
            'decodeInputResult',  
            decodedData
        );
    });

    ipc.server.on('socket.disconnected',
    function(socket, destroyedSocketID) {
        console.log('client ' + destroyedSocketID + ' has disconnected!');
    });
});

ipc.server.start();