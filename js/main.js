function randInt(bound1, bound2) {
  const result = Math.floor(
    Math.random() * (Math.abs(bound1 - bound2) + 1) + Math.min(bound1, bound2)
  );
  return result;
}

function randFloat(bound1, bound2, floatSigns) {
  const result =
    Math.random() * Math.abs(bound1 - bound2) + Math.min(bound1, bound2);
  return +result.toFixed(floatSigns);
}

randInt(13, 3);
randFloat(24.3, 24, 4);
