const ipc = require('node-ipc')

ipc.config.logInColor      = true;
ipc.config.logDepth        = 0;
ipc.config.logger          = console.log;
ipc.config.silent          = true;

const testABI = [{"inputs": [{"type": "address", "name": ""}], "constant": true, "name": "isInstantiation", "payable": false, "outputs": [{"type": "bool", "name": ""}], "type": "function"}, {"inputs": [{"type": "address[]", "name": "_owners"}, {"type": "uint256", "name": "_required"}, {"type": "uint256", "name": "_dailyLimit"}], "constant": false, "name": "create", "payable": false, "outputs": [{"type": "address", "name": "wallet"}], "type": "function"}, {"inputs": [{"type": "address", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "instantiations", "payable": false, "outputs": [{"type": "address", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "creator"}], "constant": true, "name": "getInstantiationCount", "payable": false, "outputs": [{"type": "uint256", "name": ""}], "type": "function"}, {"inputs": [{"indexed": false, "type": "address", "name": "sender"}, {"indexed": false, "type": "address", "name": "instantiation"}], "type": "event", "name": "ContractInstantiation", "anonymous": false}];
const inputData = '0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa';

ipc.connectTo(
    'syseth',
    function(){
        ipc.of.syseth.on(
            'connect',
            function(){
                //console.log('## connected to syseth ##'.rainbow, ipc.config.delay);
                ipc.of.syseth.emit(
                    'decodeInput',  //any event or message type your server listens for
                    `${JSON.stringify(testABI)}|||${inputData}`,
                )
            }
        );
        ipc.of.syseth.on(
            'disconnect',
            function(){
                console.log('disconnected from syseth');
            }
        );
        ipc.of.syseth.on(
            'decodeInputResult',  //any event or message type your server listens for
            function(data){
                console.log(data);
            }
        );
    }
);
 