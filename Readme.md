
# style-canvas

  Use CSS to style canvas paths

## Installation

    $ component install Swatinem/style-canvas

## Example

```css
.stroke {
  stroke: #ccc;
  stroke-width: 5;
  stroke-linejoin: round;
  stroke-linecap: round;
}
```

```js
ctx.beginPath();
[…]
styleCanvas(ctx, '.stroke');
ctx.stroke();
```

## License

  GPLv3
