export default (function(global) {

	console.log('polyfilling System!');

	global.System = global.System || {};

	global.System["import"] = function(dep) {
		console.log('got dep:', dep);

		return {
			then: function(cb) {
				cb();
			}
		}

	}

})(window || this);
