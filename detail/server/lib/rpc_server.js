const net = require('net');

class RPC {
    constructor({encodeResponse, decodeRequest, isCompleteRequest}) {
        this.encodeResponse = encodeResponse;
        this.decodeRequest = decodeRequest;
        this.isCompleteRequest = isCompleteRequest;
    }

    createServer(callback) {
        let buffer = null;
        const tcpServer = net.createServer(socket => {
            socket.on('data', data => {
                buffer = (buffer && buffer.length > 0) ? Buffer.concat([buffer, data]) : data;
                let packageLength,
                    requestBuffer;
                while (buffer && (packageLength = this.isCompleteRequest(buffer))) {
                    if (buffer.length === packageLength) {
                        requestBuffer = buffer;
                        buffer = null;
                    } else {
                        requestBuffer = buffer.slice(0, packageLength);
                        buffer = buffer.slice(packageLength);
                    }
                    const {seq, result} = this.decodeRequest(requestBuffer);
                    callback({
                        socket,
                        body: result
                    }, {
                        end: (data) => {
                            socket.write(this.encodeResponse(data, seq));
                        }
                    });
                }
            });
        });

        return {
            listen(...args) {
                return tcpServer.listen(...args);
            }
        }
    }
}

module.exports = RPC;