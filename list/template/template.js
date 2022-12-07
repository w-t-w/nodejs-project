const vm = require('vm');
const fs = require('fs');

const templateCache = {};

const templateContext = vm.createContext({
    _(str) {
        if (typeof str === "undefined") return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    },
    include(name, data) {
        const template = templateCache[name] || createTemplate(name);
        return template(data);
    }
});

function createTemplate(templatePath) {
    templateCache[templatePath] = vm.runInContext(`
        function render() {
            return function(data) {
                with(data) {
                    return \`${fs.readFileSync(templatePath, 'utf-8')}\`
                }
            }
        }
    `, templateContext)();
    return templateCache[templatePath];
}

module.exports = createTemplate;