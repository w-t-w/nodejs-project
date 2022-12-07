if (typeof window === 'undefined' || typeof self === 'undefined') {
    global.window = {};
    global.self = {};
}

const {nodejs_component} = require('../../component/build/component_index');
const {List} = nodejs_component;

function App(columns) {
    return <List
        columns={columns}
        sort={() => {
            console.log('ssr-sort');
        }}
        filter={() => {
            console.log('ssr-filter');
        }}
    />
}

module.exports = App;





