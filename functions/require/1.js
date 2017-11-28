function require(path) {
    var mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + path + '"');
    if (!mod.exports) {
        mod.exports = {};
        mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
}

require.modules = {};

require.register = function (path, fn) {
    require.modules[path] = fn;
};

require.relative = function (parent) {
    return function (p) {
        if ('.' != p.charAt(0)) return require(p);
        var path = parent.split('/');
        var segs = p.split('/');
        path.pop();

        for (var i = 0; i < segs.length; i++) {
            var seg = segs[i];
            if ('..' == seg) path.pop();
            else if ('.' != seg) path.push(seg);
        }

        var v = require(path.join('/'));
        console.log('require.relative =' + v);
        return v;
    };
};

console.log(11)

require.register('2.js', function(modules, exports, require){
    console.log(require)
	exports.b = 1;
})
var a = require('2.js')
console.log(a)