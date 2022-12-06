const EasySock = require('easy_sock');
const fs = require('fs');
const path = require('path');
const pb = require('protocol-buffers');

const {ColumnRequest, ColumnResponse} = pb(fs.readFileSync(path.resolve(__dirname, '../proto/column.proto')));

const PORT = 4000;

const easySock = new EasySock({
    ip: '127.0.0.1',
    port: PORT,
    timeout: 500,
    keepAlive: true
});

easySock.encode = (data, seq) => {
    const body = ColumnRequest.encode(data);
    const header = Buffer.alloc(8);
    header.writeInt32BE(seq);
    header.writeInt32BE(body.length, 4);
    return Buffer.concat([header, body]);
};

easySock.decode = (buffer) => {
    const seq = buffer.readInt32BE();
    const result = ColumnResponse.decode(buffer.slice(8));
    return {
        seq,
        result
    };
};

easySock.isReceiveComplete = (buffer) => {
    if (buffer.length < 8) {
        return 0;
    }
    const bodyLength = buffer.readInt32BE(4);
    if (buffer.length >= bodyLength + 8) {
        return bodyLength + 8;
    } else {
        return 0;
    }
};

module.exports = easySock;