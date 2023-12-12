const myName = document.getElementsByClassName('my-name')[0];
const container = document.getElementsByClassName('container')[0];
const canvas = document.getElementsByTagName('canvas')[0];

const toggleParticles = () => {
  container.classList.toggle('silent');
};

myName.addEventListener('click', toggleParticles);
