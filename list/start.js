const fs = require('fs');
const path = require('path');
const pb = require('protocol-buffers');

const server = require('./backend/server');
const mockColumns = require('./backend/mockData/column');

const PORT = 4000;

const {List, Sort} = pb(fs.readFileSync(path.resolve(__dirname, './proto/list.proto')));

const rpcServer = server(Sort, List);
rpcServer.createServer((request, response) => {
    const {body: {sorted, filtered}} = request;
    response.end({
        columns: mockColumns.sort((a, b) => {
            switch (sorted) {
                case 1:
                    return a.id - b.id;
                case 2:
                    return a.sub_count - b.sub_count;
                case 3:
                    return a.column_price - b.column_price;
            }
        }).filter(item => {
            if (filtered === 0) {
                return item;
            } else {
                return item.type === filtered;
            }
        })
    });
}).listen(PORT, () => {
    console.log(`Backend server is running at port ${PORT}~`);
});

