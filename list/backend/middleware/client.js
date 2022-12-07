const EasySock = require('easy_sock');
const pb = require('protocol-buffers');
const fs = require('fs');
const path = require('path');

const {List, Sort} = pb(fs.readFileSync(path.resolve(process.cwd(), './list/proto/list.proto')));

const PORT = 3000;

const easySock = new EasySock({
    ip: '127.0.0.1',
    port: PORT,
    timeout: 500,
    keepAlive: true
});

easySock.isReceiveComplete = buffer => {
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

easySock.encode = (data, seq) => {
    const body = Sort.encode(data);
    const header = Buffer.alloc(8);
    header.writeInt32BE(seq);
    header.writeInt32BE(body.length, 4);
    return Buffer.concat([header, body]);
};

easySock.decode = buffer => {
    const seq = buffer.writeInt32BE();
    const result = List.decode(buffer.slice(8));
    return {
        seq,
        result
    };
};

module.exports = easySock;