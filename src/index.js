import Warp from './warp.js';

const svgName = document.querySelector('.svg2');
const warp = new Warp(svgName);

warp.transform(([x, y]) => [x, y, y]);

let offset = 0;
function animate() {
  warp.transform(([x, y, oy]) => [
    x,
    oy + 0.8 * Math.sin(x / 0.3 + offset),
    oy,
  ]);
  offset -= 0.01;
  requestAnimationFrame(animate);
}

animate();
