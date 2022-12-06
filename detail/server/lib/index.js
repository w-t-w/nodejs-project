const RPC = require('./rpc_server');

module.exports = (pbColumnRequest, pbColumnResponse) => {
    return new RPC({
        encodeResponse(data, seq) {
            const body = pbColumnResponse.encode(data);
            const header = Buffer.alloc(8);
            header.writeInt32BE(seq);
            header.writeInt32BE(body.length, 4);
            return Buffer.concat([header, body]);
        },
        decodeRequest(buffer) {
            const seq = buffer.readInt32BE();
            const result = pbColumnRequest.decode(buffer.slice(8));
            return {
                seq,
                result
            };
        },
        isCompleteRequest(buffer) {
            if (buffer.length < 8) {
                return 0;
            }
            const bodyLength = buffer.readInt32BE(4);
            if (buffer.length >= bodyLength + 8) {
                return 8 + bodyLength;
            } else {
                return 0;
            }
        }
    });
};