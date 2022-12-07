module.exports = (o) => {
    const source = new WeakMap();

    function deepClone(o) {
        const _o = Array.isArray(o) ? [] : {},
            existObj = source.get(o);
        if (existObj) return existObj;
        source.set(o, o);
        for (const key of Reflect.ownKeys(o)) {
            if (o.hasOwnProperty(key)) {
                if (o[key] && typeof o[key] === 'object') {
                    _o[key] = deepClone(o[key]);
                } else {
                    _o[key] = o[key];
                }
            }
        }
        return _o;
    }

    return deepClone(o);
};