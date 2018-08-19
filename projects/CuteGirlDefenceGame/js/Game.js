'use strict';
import Input from './service/Input';
import Sound from './service/Sound';
import GameTimer from './service/GameTimer'
import Flower from './characters/Flower';
import CuteGirl from './characters/CuteGirl';
import Zombie from './characters/Zombie';
import {sounds, images, background} from './additional/constants'

const CHARACTER_TARGET_TIME_BONUS = 2500;
const CHARACTER_TARGET_POINTS = 7;

const options = document.querySelector('#options');
const deskText = document.querySelector('#desk-text');
const gameState = document.querySelector('#game-state');
const scoreNode = document.querySelector('#score');
const canvasWrapper = document.querySelector('#canvas-wrapper');
const cachedImages = {};

export default class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 1104;
    this.canvas.height = 621;
    this.character = new CuteGirl(this.canvas);
    this.characterTarget = new Flower(this.canvas);
    this.input = new Input();
    this.backgroundAudio = new Sound(sounds.background);
    this.backgroundImage = null;
    this.timer = new GameTimer();
    this.gameTime = 0;
    this.lastTime = 0;
    this.isGameOver = false;
    this.enemies = [];
    this.score = 0;
    canvasWrapper.appendChild(this.canvas);
  }

  start() {
    this.loadImages(this.init.bind(this));
    this.addListeners();
    this.canvas.classList.add('sword');
    options.classList.toggle('invisible');
    options.classList.toggle('start-view');
    options.classList.toggle('restart-view');
  }

  main() {
    const now = Date.now();
    const timeDifference = (now - this.lastTime) / 1000;
    this.update(timeDifference);
    this.render();
    this.lastTime = now;
    window.requestAnimationFrame(this.main.bind(this));
  }

  init() {
    this.backgroundImage = this.context.createPattern(cachedImages[images.background], 'no-repeat');
    this.reset();
    this.lastTime = Date.now();
    gameState.classList.toggle('invisible');
    this.main();
  }

  loadImages(func) {
    const loadImage = (path) => new Promise(resolve => {
      const img = new Image();
      img.addEventListener('load', () => resolve(cachedImages[path] = img));
      img.src = path;
    });
    Promise.all(Object.values(images).map(loadImage))
      .then(() => func());
  }

  update(timeDifference) {
    this.gameTime += timeDifference;
    scoreNode.textContent = this.score;
    this.updateEntities(timeDifference);
    if (this.character.state !== 'dead') {
      this.handleInput(timeDifference);
    }
    if (this.enemies.length < 10) {
      if (Math.random() < 1 - Math.pow(0.993, this.gameTime)) {
        this.enemies.push(Zombie.createRandomZombie(this.canvas));
      }
    }
    this.checkCollisions();
    if ((this.character.health <= 0 || this.timer.gameTime <= 0) && !this.isGameOver) {
      this.gameOver();
    }
  }

  updateEntities(timeDifference) {
    this.character.sprite.update(timeDifference);
    this.characterTarget.sprite.update(timeDifference);
    this.enemies = this.enemies.filter(enemy => !(enemy.state === 'dead' && enemy.sprite.done));
    this.enemies.forEach(enemy => {
      if (enemy.sprite.done && enemy.state === 'attack') {
        enemy.walk();
      }
      if (this.character.state !== 'dead') {
        enemy.update(this.character.position, timeDifference)
      } else {
        enemy.update(enemy.startPosition, timeDifference);
      }
    });
  }

  render() {
    const [deadEnemies, aliveEnemies] = this.enemies.reduce((acc, enemy) => {
      enemy.state === 'dead' ?
        acc[0].push(enemy) :
        acc[1].push(enemy);
      return acc;
    }, [[], []]);
    this.context.fillStyle = this.backgroundImage;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderEntities(this.characterTarget, ...deadEnemies, this.character, ...aliveEnemies);
    this.character.isMove = this.character.state !== 'walk';
  }

  renderEntities(...arr) {
    arr.forEach(item => {
      this.context.save();
      this.context.translate(item.position[0], item.position[1]);
      item.sprite.render(this.context, cachedImages, item);
      this.context.restore();
    });
  }

  handleInput(timeDifference) {
    const [x, y] = [this.character.position[0], this.character.position[1]];

    if (this.input.isDown('DOWN') || this.input.isDown('s')) {
      this.character.position[1] += this.character.speed * timeDifference;
    }
    if (this.input.isDown('UP') || this.input.isDown('w')) {
      this.character.position[1] -= this.character.speed * timeDifference;
    }
    if (this.input.isDown('LEFT') || this.input.isDown('a')) {
      this.character.position[0] -= this.character.speed * timeDifference;
      this.character.direction = 'left';
    }
    if (this.input.isDown('RIGHT') || this.input.isDown('d')) {
      this.character.position[0] += this.character.speed * timeDifference;
      this.character.direction = 'right';
    }
    if (x !== this.character.position[0] || y !== this.character.position[1]) {
      this.character.isMove = true;
    }
  }

  checkCollisions() {
    this.checkMainCharacterBounds();
    if (this.characterCollides(this.characterTarget, this.character)) {
      this.character.happy();
      this.characterTarget.grow();
      this.timer.gameTime += CHARACTER_TARGET_TIME_BONUS;
      this.score += CHARACTER_TARGET_POINTS;
    }
    this.enemies.forEach(enemy => {
      if (this.characterCollides(this.character, enemy) && enemy.state === 'walk' && this.character.state !== 'dead') {
        enemy.attack();
        this.character.hurt();
      }
    })
  }

  /*
   * Collides takes the coordinates for the center of the first character
   * and top/left, bottom/right corners for the second box
   * and checks to see if there are any gaps.
   */
  characterCollides(character1, character2) {
    const center = [character1.position[0] + (character1.sprite.size[0] / 2),
      character1.position[1] + (character1.sprite.size[1] / 2)];

    return center[0] <= character2.position[0] + character2.sprite.size[0] &&
      center[0] >= character2.position[0] &&
      center[1] <= character2.position[1] + character2.sprite.size[1] &&
      center [1] >= character2.position[1];
  }

  addListeners() {
    this.canvas.addEventListener('mousedown', e => {
      this.enemies.forEach(enemy => {
        if (enemy.position[0] < e.offsetX && enemy.position[0] + enemy.sprite.size[0] > e.offsetX &&
          enemy.position[1] < e.offsetY && enemy.position[1] + enemy.sprite.size[1] > e.offsetY) {
          this.canvas.classList.remove('sword');
          this.canvas.classList.add('sword-active');
          enemy.health--;
        }
        if (enemy.health <= 0 && enemy.state !== 'dead') {
          enemy.die();
          this.score++;
        }
      })
    });
    this.canvas.addEventListener('mouseup', () => {
      this.canvas.classList.remove('sword-active');
      this.canvas.classList.add('sword');
    })
  }

  checkMainCharacterBounds() {
    // Left
    if (this.character.position[0] < 0) {
      this.character.position[0] = 0;
    }
    // Right
    else if (this.character.position[0] > this.canvas.width - this.character.sprite.size[0]) {
      this.character.position[0] = this.canvas.width - this.character.sprite.size[0];
    }
    // Top
    if (this.character.position[1] < background.TOP_USELESS_HEIGHT) {
      this.character.position[1] = background.TOP_USELESS_HEIGHT;
    }
    // Bottom
    else if (this.character.position[1] > this.canvas.height - background.BOTTOM_USELESS_HEIGHT) {
      this.character.position[1] = this.canvas.height - background.BOTTOM_USELESS_HEIGHT;
    }
  }

  gameOver() {
    this.isGameOver = true;
    this.backgroundAudio.stop();
    this.timer.stop();
    this.character.die();
    deskText.textContent = this.score;
    setTimeout(() => options.classList.toggle('invisible'), 1500);
  }

  reset() {
    this.isGameOver = false;
    this.gameTime = 0;
    this.score = 0;
    this.enemies.length = 0;
    this.character.live();
    this.characterTarget.grow();
    this.backgroundAudio.play();
    this.timer.start();
    options.classList.add('invisible');
    this.character.position = [this.canvas.width / 2 - this.character.sprite.size[0] / 2,
      this.canvas.height / 2 - this.character.sprite.size[1] / 2];
  }
}
