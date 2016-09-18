const spawn = require('child_process').spawn;

var proto = module.exports = new Ansible();

function Ansible() {
}
proto.handler = function(data) {
    console.log(""+data);
};
function con(data) {
    /*for (var i =0; i < proto.handler.length; i++) {
        proto.handler[i](data);
    }*/
    proto.handler(''+data);
    console.log(''+data);
}
Ansible.prototype.run = function(filename) {
    const shell = spawn('ansible-playbook', [filename]);
    shell.stdout.on('data', con);

    shell.stderr.on('data', con);

    shell.on('close', con);
};
Ansible.prototype.addListener = function(newhandler) {
    proto.handler = newhandler;
}
