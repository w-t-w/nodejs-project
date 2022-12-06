const Koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const path = require('path');

const rpcClient = require('./lib/client');
const createTemplate = require('./template');
const template = createTemplate(path.resolve(__dirname, './template/template.html'));

const PORT = 3000;

const koa = new Koa();

koa.use(static(path.resolve(process.cwd(), './source/detail')));

koa.use(mount('/', async (ctx, next) => {
    const result = await new Promise((resolve, reject) => {
        rpcClient.write({
            columnId: ctx.request.query.id
        }, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
    ctx.response.status = 200;
    ctx.response.body = template(result);
}));

koa.listen(PORT, () => {
    console.log(`The page is running at port ${PORT}~`);
});