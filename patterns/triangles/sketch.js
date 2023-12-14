/*By Steve's Makerspace
  video: https://youtu.be/ig0q6vfpD38
	editor: https://editor.p5js.org/StevesMakerspace/sketches/2CYhFiZot
*/

let canv, col, col2, col3, col4, dec1, dec2, pos, n, size;
let factor;
let largest;
let r1, g1, b1, sF;
let seed;

function preload() {
  table = loadTable('colors.csv', 'csv', 'header');
}

function setup() {
  canv = createCanvas(window.innerWidth, window.innerHeight);
  canv.mouseClicked(draw);

  noStroke();

  const saveBtn = createButton('save');
  saveBtn.mousePressed(saveArt);

  noLoop();
  draw();
}

function setupParams() {
  const date = new Date();
  seed = date.getTime();
  randomSeed(seed);
  noiseSeed(seed);
  factor = 0;

  const numb = floor(random(3, 20));
  size = width / numb / random(2, 4);
  largest = floor(random(1, 10));

  // alpha range 0 - 255, equals to 0 - 1
  alph = random(120, 180);
  if (random(15) < 1) {
    alph = 255;
  }
}

function draw() {
  setupParams();

  palette1 = floor(random(676));
  palette2 = floor(random(676));
  r0 = (int(table.get(palette1, 0)) + int(table.get(palette2, 0))) / 2;
  g0 = (int(table.get(palette1, 1)) + int(table.get(palette2, 1))) / 2;
  b0 = (int(table.get(palette1, 2)) + int(table.get(palette2, 2))) / 2;
  background(r0, g0, b0);
  drawShapes();
}

function drawShapes() {
  let rez = random(0.003, 0.01);
  factor += 1000;
  sF = 360 / random(2, 40);
  for (i = width; i > -size * largest; i -= size) {
    for (j = height; j > -size * largest; j -= size) {
      n1 = noise(i * rez + factor, j * rez + factor);
      n2 = noise(i * rez + factor + 10000, j * rez + factor + 10000);
      n3 = noise(i * rez + factor + 20000, j * rez + factor + 20000);
      let col3;
      let col1 = map(n1, 0, 1, 0, 360);
      let col2 = map(n2, 0, 1, 0, 360);
      let dec1 = fract(col1 / sF);
      let dec2 = fract(col2 / sF);
      if (dec1 < 0.2) {
        col3 = 0;
      } else if (dec1 < 0.4) {
        col3 = 1;
      } else if (dec1 < 0.6) {
        col3 = 2;
      } else if (dec1 < 0.8) {
        col3 = 3;
      } else {
        col3 = 4;
      }
      if (dec2 < 0.2) {
        col4 = 0;
      } else if (dec2 < 0.4) {
        col4 = 1;
      } else if (dec2 < 0.6) {
        col4 = 2;
      } else if (dec2 < 0.8) {
        col4 = 3;
      } else {
        col4 = 4;
      }
      r1 = table.get(palette1, col3 * 3);
      g1 = table.get(palette1, col3 * 3 + 1);
      b1 = table.get(palette1, col3 * 3 + 2);
      r2 = table.get(palette2, col4 * 3);
      g2 = table.get(palette2, col4 * 3 + 1);
      b2 = table.get(palette2, col4 * 3 + 2);
      let size2 = size * floor(random(1, largest));
      if (n3 < 0.25) {
        fill(r1, g1, b1, alph);
        triangle(i, j, i + size2, j + size2, i, j + size2);
        fill(r2, g2, b2, alph);
        triangle(i, j, i + size2, j + size2, i + size2, j);
      } else if (n3 < 0.5) {
        fill(r1, g1, b1, alph);
        triangle(i + size2, j, i + size2, j + size2, i, j + size2);
        fill(r2, g2, b2, alph);
        triangle(i, j + size2, i, j, i + size2, j);
      } else if (n3 < 0.75) {
        fill(r1, g1, b1, alph);
        triangle(i, j, i + size2, j + size2, i + size2, j);
        fill(r2, g2, b2, alph);
        triangle(i, j, i + size2, j + size2, i, j + size2);
      } else {
        fill(r1, g1, b1, alph);
        triangle(i, j + size2, i, j, i + size2, j);
        fill(r2, g2, b2, alph);
        triangle(i + size2, j, i + size2, j + size2, i, j + size2);
      }
    }
  }
}

function saveArt() {
  save(seed + '.jpg');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
