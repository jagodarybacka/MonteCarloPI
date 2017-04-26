function point(ctx, point) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI, false);

  if (point.inside) {
    ctx.fillStyle = '#36444C';
  } else {
    ctx.fillStyle = '#F05D5E';
  }

  ctx.fill();
}

function montecarlo(radius) {
  // orgin in center of circle
  var x, y;
  // orgin in top left corner
  var w, h;
  var rangeMax = radius*2;
  var inside = false;

  w = Math.floor(Math.random() * (rangeMax + 1));
  h = Math.floor(Math.random() * (rangeMax + 1));

  x = w - radius;
  y = (-1) * (h - radius);

  if (x*x + y*y <= radius * radius) {
    inside = true;
  }

  var data = {
    x: w,
    y: h,
    inside: inside
  };

  return data;
}

function circle(c) {
  c.ctx.beginPath();
  c.ctx.arc(c.centerX, c.centerY, c.radius, 0, 2 * Math.PI, false);
  c.ctx.fillStyle = '#A2C6CF';
  c.ctx.fill();
}

function frame(c) {
  var data = montecarlo(c.radius);

  c.pointsTotal++;
  if (data.inside) {
    c.pointsInside++;
  }

  point(c.ctx, data);

  c.pi = 4*(c.pointsInside/c.pointsTotal);
  c.insideNode.innerHTML = c.pointsInside;
  c.totalNode.innerHTML = c.pointsTotal;
  c.piNode.innerHTML = c.pi.toFixed(10);

  return c;
}

function init() {
  var config = {
    canvas: document.querySelector("#canvas"),
    ctx: canvas.getContext('2d'),
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    radius: canvas.width / 2,
    pointsInside: 0,
    pointsTotal: 0,
    pi: 0,
    insideNode: document.querySelector('#in'),
    totalNode: document.querySelector('#total'),
    piNode: document.querySelector('#pi-value')
  }

  circle(config);
  var renderFunction = function() {
    config = frame(config);
  }

  renderFunction();

  var range = document.querySelector('.pps');
  var renderInterval = setInterval(function() {
    renderFunction();
  }, range.value);

  range.onchange = function() {
    clearInterval(renderInterval);
    renderInterval = setInterval(function() {
      renderFunction();
    }, range.value);
  }

}
init();
