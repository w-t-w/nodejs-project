const RPC = require('./rpc');

module.exports = (pbRequest, pbResponse) => {
    return new RPC({
        isComplete(buffer) {
            if (buffer.length < 8) {
                return 0;
            }
            const bodyLength = buffer.readInt32BE(4);
            if (buffer.length >= bodyLength + 8) {
                return bodyLength + 8;
            } else {
                return 0;
            }
        },
        encode(data, seq) {
            const body = pbResponse.encode(data);
            const header = Buffer.alloc(8);
            header.writeInt32BE(seq);
            header.writeInt32BE(body.length, 4);
            return Buffer.concat([header, body]);
        },
        decode(buffer) {
            const seq = buffer.readInt32BE(),
                result = pbRequest.decode(buffer.slice(8));
            return {
                seq,
                result
            };
        }
    });
};