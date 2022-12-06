const fs = require('fs');
const path = require('path');
const pb = require('protocol-buffers');

const server = require('./lib');
const mockColumns = require('./mockData/columns');

const {ColumnRequest, ColumnResponse} = pb(fs.readFileSync(path.resolve(__dirname, './proto/column.proto')));

const PORT = 4000;

const rpcServer = server(ColumnRequest, ColumnResponse);

rpcServer.createServer((request, response) => {
    const columnId = request.body;
    response.end({
        mainColumn: mockColumns[0],
        asideColumn: [mockColumns[1], mockColumns[2], mockColumns[3], mockColumns[4]]
    });
}).listen(PORT, () => {
    console.log(`Server is running at port ${PORT}~`);
});