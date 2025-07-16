function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40) + 60; // 60–100%
  const lightness = Math.floor(Math.random() * 20) + 45; // 45–65%

  return hslToHex(hue, saturation, lightness);
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))),
    );
  return `#${f(0).toString(16).padStart(2, '0')}${f(8)
    .toString(16)
    .padStart(2, '0')}${f(4).toString(16).padStart(2, '0')}`;
}

export {generateRandomColor};
