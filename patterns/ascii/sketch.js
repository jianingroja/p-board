let canv;
let type = 'Film';
let typeBtn;
const size = 55;
const colors = ['tomato', 'rose', 'limegreen', 'orange', 'purple', 'firebrick'];
const texts = ['░', '▒', '▓', '█'];

function setup() {
  canv = createCanvas(window.innerWidth, window.innerHeight);
  canv.mouseClicked(draw);
  noLoop();

  typeBtn = createButton(type);
  typeBtn.addClass('type-btn');
  typeBtn.mouseClicked(handleTypeClick);
}

function handleTypeClick() {
  if (type === 'Film') {
    type = 'Fabrics';
  } else {
    type = 'Film';
  }

  typeBtn.html(type);
}

function mouseClicked() {
  clear();
  draw();
}

function draw() {
  const coX = type === 'Film' ? 0.7 : 0.5;
  const coY = type === 'Film' ? 1.3 : 0.9;
  const font = type === 'Film' ? 'sans-serif' : 'Courier New';

  background(30);
  textSize(size * 0.8);
  textFont(font);

  for (x = 0; x < width + size; x += size * coX) {
    for (y = 30; y < height + size; y += size * coY) {
      stroke(colors[floor(random(6))]);
      fill(random(255), random(100, 200), random(150, 190));
      text(texts[floor(random(3))], x, y);
      if (type === 'Film') {
        text(texts[floor(random(3))], x + 10, y);
      }
    }
  }
}

function keyTyped() {
  if (key === 's') {
    save('film.jpg');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
