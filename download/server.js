const Koa = require('koa');
const mount = require('koa-mount');
const path = require('path');
const fs = require('fs');
const static = require('koa-static');

const PORT = 4000;

const koa = new Koa();

koa.use(static(path.resolve(process.cwd(), './source/download')));

koa.use(mount('/', function (ctx) {
    ctx.response.body = fs.readFileSync(path.resolve(process.cwd(), './source/download/download.html'), 'utf-8');
}));

koa.listen(PORT, function () {
    console.log(`Server is running at localhost:${PORT}`);
});