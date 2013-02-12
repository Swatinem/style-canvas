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
	'text-align': 'textAlign',
	'vertical-align': 'textBaseline', // there is no equivalent in css for this one :(
	/*'stroke-dasharray': function (ctx, val) {
	},*/
};

// TODO: support setter style, such as ctx.setLineDash()
// TODO: somehow support gradients and the likes?
// TODO: somehow support shadows?

function styleCanvas(ctx, selector) {
	// apply simple values
	var styles = style(selector, Object.keys(mapping));
	for (var prop in mapping) {
		var fn = mapping[prop];
		var s = styles[prop];
		if (typeof fn == 'function')
			fn(ctx, s);
		else
			ctx[fn] = s;
	}
	// thank you firefox for not supporting shorthand properties
	var fontprops = style(selector, [
		'font-style', 'font-variant',
		'font-weight', 'font-size',
		'line-height', 'font-family']);
	ctx.font = [
		fontprops['font-style'],
		fontprops['font-variant'],
		fontprops['font-weight'],
		fontprops['font-size'] + '/' + fontprops['line-height'],
		fontprops['font-family']
	].join(' ');
}

function pi(prop) {
	return function (ctx, value) {
		ctx[prop] = parseInt(value, 10);
	}
}
