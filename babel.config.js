module.exports = {
    presets: [[
        '@babel/preset-env',
        {
            useBuiltIns: 'usage',
            loose: false,
            modules: false,
            corejs: {
                version: 3,
                proposal: true
            }
        }
    ], [
        '@babel/preset-react',
        {
            runtime: 'automatic'
        }
    ]]
};