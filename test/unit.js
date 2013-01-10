
/**
 * Module dependencies.
 */

var sc = require('style-canvas');

describe('styleCanvas(ctx, selector)', function () {
	it('should properly style strokes', function () {
		compare('.stroke', function (ctx) {
			ctx.strokeStyle = '#ccc';
			ctx.lineWidth = 5;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
		}, function (ctx, style) {
			ctx.beginPath();
			ctx.moveTo(5, 5);
			ctx.lineTo(25, 50);
			ctx.lineTo(90, 75);
			style(ctx);
			ctx.stroke();
		});
	});

	it.skip('should support setters such as ctx.setLineDash()', function () {
		compare('.stroke .dash', function (ctx) {
			ctx.strokeStyle = '#ccc';
			ctx.lineWidth = 5;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.setLineDash([5, 3, 2]);
		}, function (ctx, style) {
			ctx.beginPath();
			ctx.moveTo(5, 5);
			ctx.lineTo(25, 50);
			ctx.lineTo(90, 75);
			style(ctx);
			ctx.stroke();
		});
	});

	it('should properly style fills', function () {
		compare('.fill', function (ctx) {
			ctx.fillStyle = 'rgba(0, 128, 255, 0.6)';
		}, function (ctx, style) {
			ctx.beginPath();
			ctx.moveTo(5, 5);
			ctx.lineTo(25, 50);
			ctx.lineTo(90, 75);
			ctx.closePath();
			style(ctx);
			ctx.fill();
		});
	});

	it.skip('should support styling text', function () {
		//compare('.text');
	});
});

function compare(selector, style, draw) {
	var i1 = drawWith(draw, function (ctx) {
		sc(ctx, selector);
	});
	var i2 = drawWith(draw, style);
	if (i1 !== i2) throw new Error('Drawing does not match');
}

function drawWith(draw, style) {
	var canvas = document.createElement('canvas');
	canvas.height = canvas.width = 100;
	var ctx = canvas.getContext('2d');
	draw(ctx, style);
	return canvas.toDataURL();
}
