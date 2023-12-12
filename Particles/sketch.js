const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  const particlesLength = Math.floor(window.innerWidth / 8);
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(20);

  particles.forEach((particle, index) => {
    particle.update();
    particle.born();
    particle.connect(particles.slice(index));
  });

  const myParticle = new Particle(mouseX, mouseY, `rgba(123, 255, 255, 0.5)`);
  myParticle.born();
}

class Particle {
  constructor(x, y, color) {
    this.pos = createVector(x || random(width), y || random(height));
    this.size = x / 30 || random(width / 50);
    this.vel = createVector(random(-3, 3), random(-8, 8));
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

      if (distance < 120) {
        const alpha = map(distance, 0, 120, 0, 0.25);
        stroke(`rgba(123, 255, 255, ${alpha})`);
        strokeWeight(2);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
