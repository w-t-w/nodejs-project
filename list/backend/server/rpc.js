const net = require('net');

class RPC {
    constructor({encode, decode, isComplete}) {
        this.encode = encode;
        this.decode = decode;
        this.isComplete = isComplete;
    }

    createServer(callback) {
        let buffer = null;
        const tcpServer = net.createServer(socket => {
            socket.on('data', data => {
                buffer = (buffer && buffer.length > 0) ? Buffer.concat([buffer, data]) : data;
                let packageLength = null,
                    requestBuffer = null;
                while (buffer && (packageLength = this.isComplete(buffer))) {
                    if (buffer.length === packageLength) {
                        requestBuffer = buffer;
                        buffer = null;
                    } else {
                        requestBuffer = buffer.slice(0, packageLength);
                        buffer = buffer.slice(packageLength);
                    }
                    const {seq, result} = this.decode(requestBuffer);
                    callback({
                        socket,
                        body: result
                    }, {
                        end: (data) => {
                            socket.write(this.encode(data, seq));
                        }
                    });
                }
            });
        });

        return {
            listen(...args) {
                return tcpServer.listen(...args);
            }
        };
    }
}

module.exports = RPC;