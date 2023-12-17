let particles = [];
let isSilent = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(1);

  particlesLength = Math.floor(window.innerWidth / 10);
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function mouseClicked() {
  toggleSilent();
}

function keyPressed() {
  if (key === ' ') {
    toggleSilent();
  }
}

function toggleSilent() {
  if (isSilent) {
    setup();
    isSilent = false;
    loop();
  } else {
    particles = [];
    isSilent = true;
    noLoop();
  }
}

function draw() {
  background(20);

  if (!isSilent) {
    particles.forEach((particle, index) => {
      particle.update();
      particle.born();
      particle.connect(particles.slice(index));
    });

    const myParticle = new Particle(mouseX, mouseY, `rgba(123, 255, 255, 0.5)`);
    myParticle.born();
  }
}

class Particle {
  constructor(x, y, color) {
    this.pos = createVector(x || random(width), y || random(height));
    this.size = x / 30 || random(width / 50);
    this.vel = createVector(random(-25, 25), random(-25, 25));
    this.color = color;
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  born() {
    noStroke();
    if (this.color) {
      fill(this.color);
    } else {
      fill(`rgba(255, 255, 255, 0.5)`);
    }
    circle(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  connect(particles) {
    particles.forEach((particle) => {
      const distance = dist(
        this.pos.x,
        this.pos.y,
        particle.pos.x,
        particle.pos.y
      );

      if (distance < 130) {
        const alpha = map(distance, 0, 130, 0, 0.3);
        stroke(`rgba(123, 255, 255, ${alpha})`);
        strokeWeight(2);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
