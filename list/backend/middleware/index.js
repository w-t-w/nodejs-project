const Koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const path = require('path');
const reactServer = require('react-dom/server');

const getData = require('./getData');
const App = require('../build/ssr_index');
const template = require('../../template/template')(path.resolve(process.cwd(), './list/template/index.html'));

const PORT = 3000;

const koa = new Koa();

koa.use(static(path.resolve(process.cwd(), './source/list')));

koa.use(mount('/data', async ctx => {
    const {sorted = 0, filtered = 0} = ctx.request.query;
    ctx.response.status = 200;
    ctx.response.body = await getData({sorted: +sorted, filtered: +filtered});
}));

koa.use(mount('/', async ctx => {
    const {sorted = 0, filtered = 0} = ctx.request.query;
    const data = await getData({
        sorted: +sorted,
        filtered: +filtered
    });
    ctx.response.status = 200;
    ctx.response.body = template({
        reactString: reactServer.renderToString(App(data)),
        reactData: data,
        sorted,
        filtered
    });
}));

koa.listen(PORT, () => {
    console.log(`Browser server is running at port ${PORT}~`);
});

