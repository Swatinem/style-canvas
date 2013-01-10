var style = require('style');

module.exports = styleCanvas;

/**
 * This is a mapping from svg-style css properties to canvas properties
 */
var mapping = {
	'stroke': 'strokeStyle',
	'stroke-width': 'lineWidth',
	'stroke-linecap': 'lineCap',
	'stroke-linejoin': 'lineJoin',
	'fill': 'fillStyle'
};

// TODO: support setter style, such as ctx.setLineDash()
// TODO: support text properties
// TODO: somehow support gradients and the likes?
// TODO: somehow support shadows?

function styleCanvas(ctx, selector) {
	for (var prop in mapping) {
		var fn = mapping[prop];
		var s = style(selector, prop);
		ctx[fn] = s;
	}
}
