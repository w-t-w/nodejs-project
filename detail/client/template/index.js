const vm = require('vm');
const fs = require('fs');

const templateCache = {};

const templateContext = vm.createContext({
    include(name, data) {
        const template = templateCache[name] || createTemplate(name);
        return template(data);
    }
});

function createTemplate(templatePath) {
    templateCache[templatePath] = vm.runInNewContext(`
        (function(data) {
            with(data) {
                return \`${fs.readFileSync(templatePath, 'utf-8')}\`
            }
        })
    `, templateContext);
    return templateCache[templatePath];
}

module.exports = createTemplate;