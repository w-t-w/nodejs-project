const rpcClient = require('./client');
const deepClone = require('../utils/deepClone');

module.exports = (o) => {
    o = deepClone(o);
    return new Promise((resolve, reject) => {
        rpcClient.write({
            ...o
        }, (err, data) => {
            if (err) reject(err);
            else resolve(data.columns);
        });
    });
};