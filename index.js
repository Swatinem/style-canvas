var style = require('style');

module.exports = styleCanvas;

/**
 * This is a mapping from svg-style css properties to canvas properties
 */
var mapping = {
	'stroke': 'strokeStyle',
	'stroke-width': pi('lineWidth'),
	'stroke-linecap': 'lineCap',
	'stroke-linejoin': 'lineJoin',
	'stroke-miterlimit': 'miterLimit',
	'fill': 'fillStyle',
	'font': 'font',
	'text-align': 'textAlign',
	'vertical-align': 'textBaseline', // there is no equivalent in css for this one :(
	/*'stroke-dasharray': function (ctx, val) {
	},*/
};

// TODO: support setter style, such as ctx.setLineDash()
// TODO: somehow support gradients and the likes?
// TODO: somehow support shadows?

function styleCanvas(ctx, selector) {
	for (var prop in mapping) {
		var fn = mapping[prop];
		var s = style(selector, prop);
		if (typeof fn == 'function')
			fn(ctx, s);
		else
			ctx[fn] = s;
	}
}

function pi(prop) {
	return function (ctx, value) {
		ctx[prop] = parseInt(value, 10);
	}
}
