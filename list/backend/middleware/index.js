const Koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const path = require('path');

const getData = require('./getData');
const template = require('../../template/template')(path.resolve(process.cwd(), './list/template/index.html'));

const PORT = 3000;

const koa = new Koa();

koa.use(static(path.resolve(process.cwd(), './source/list')));

koa.use(mount('/data', async (ctx, next) => {
    ctx.status = 200;

}));

koa.use(mount('/', async (ctx, next) => {
    const {sorted = 0, filtered = 0} = ctx.request.query;
    const data = await getData({
        sorted,
        filtered
    });
    ctx.response.status = 200;
    ctx.response.body = template({

    });
}));

koa.listen(PORT, () => {
    console.log(`Browser server is running at port ${PORT}~`);
});

