/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Sprite {
    constructor(url,
                position,
                size,
                speed,
                frames,
                isOnce,
                lastFrame = 0,
                isMove = true,
                direction = 'horizontal') {
        this.url = url;
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.frames = frames;
        this.isOnce = isOnce;
        this.lastFrame = lastFrame;
        this.isMove = isMove;
        this.direction = direction;
        this.done = false;
        this.index = 0;
    }

    update(timeDifference) {
        this.index += this.speed * timeDifference;
    }

    render(context, images, item) {
        let frame = 0;
        let x = this.position[0],
            y = this.position[1];

        if (this.speed > 0) {
            const max = this.frames.length;
            const idx = Math.floor(this.index);

            frame = this.frames[idx % max];

            if (this.isOnce && idx >= max) {
                this.done = true;
                x = this.lastFrame;
            }
        }

        if (!this.done && item.isMove) {
            this.direction === 'vertical' ?
                y += frame * this.size[1] :
                x += frame * this.size[0];
        }

        if (item.direction !== 'right') {
            y = this.position[1] + this.size[1];
        }

        context.drawImage(images[this.url],
            x, y,
            this.size[0], this.size[1],
            0, 0,
            this.size[0], this.size[1]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandomInt;


function getRandomInt(from, to) {
    return Math.floor(Math.random() * (from - to)) + to;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game__ = __webpack_require__(5);



const game = new __WEBPACK_IMPORTED_MODULE_0__Game__["a" /* default */]();
const sections = Array.from(document.querySelectorAll('section'));
const options = document.querySelector('#options');
const currentView = window.location.href.split('#')[1];

options.addEventListener('click', e => {
    if (e.target.id === 'desk-button') {
        if (e.target.parentNode.classList.contains('start-view')) {
            game.start();
        } else if (e.target.parentNode.classList.contains('restart-view')) {
            game.reset();
        }
    }
});

window.addEventListener('hashchange', e => {
    const id = e.newURL.split('#')[1];
    changeView(id);
});

function changeView(id) {
    document.querySelector('.active').classList.remove('active');

    typeof id === 'undefined' ?
        sections[0].classList.add('active') :
        document.getElementById(id).classList.add('active');
}

changeView(currentView);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_Input__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_Sound__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_GameTimer__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__characters_Flower__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__characters_CuteGirl__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__characters_Zombie__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__additional_constants__ = __webpack_require__(11);









const CHARACTER_TARGET_TIME_BONUS = 2500;
const CHARACTER_TARGET_POINTS = 7;

const options = document.querySelector('#options');
const deskText = document.querySelector('#desk-text');
const gameState = document.querySelector('#game-state');
const scoreNode = document.querySelector('#score');
const canvasWrapper = document.querySelector('#canvas-wrapper');
const cachedImages = {};

class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 1104;
    this.canvas.height = 621;
    this.character = new __WEBPACK_IMPORTED_MODULE_4__characters_CuteGirl__["a" /* default */](this.canvas);
    this.characterTarget = new __WEBPACK_IMPORTED_MODULE_3__characters_Flower__["a" /* default */](this.canvas);
    this.input = new __WEBPACK_IMPORTED_MODULE_0__service_Input__["a" /* default */]();
    this.backgroundAudio = new __WEBPACK_IMPORTED_MODULE_1__service_Sound__["a" /* default */](__WEBPACK_IMPORTED_MODULE_6__additional_constants__["d" /* sounds */].background);
    this.backgroundImage = null;
    this.timer = new __WEBPACK_IMPORTED_MODULE_2__service_GameTimer__["a" /* default */]();
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
    this.backgroundImage = this.context.createPattern(cachedImages[__WEBPACK_IMPORTED_MODULE_6__additional_constants__["c" /* images */].background], 'no-repeat');
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
    Promise.all(Object.values(__WEBPACK_IMPORTED_MODULE_6__additional_constants__["c" /* images */]).map(loadImage))
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
        this.enemies.push(__WEBPACK_IMPORTED_MODULE_5__characters_Zombie__["a" /* default */].createRandomZombie(this.canvas));
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
    if (this.character.position[1] < __WEBPACK_IMPORTED_MODULE_6__additional_constants__["a" /* background */].TOP_USELESS_HEIGHT) {
      this.character.position[1] = __WEBPACK_IMPORTED_MODULE_6__additional_constants__["a" /* background */].TOP_USELESS_HEIGHT;
    }
    // Bottom
    else if (this.character.position[1] > this.canvas.height - __WEBPACK_IMPORTED_MODULE_6__additional_constants__["a" /* background */].BOTTOM_USELESS_HEIGHT) {
      this.character.position[1] = this.canvas.height - __WEBPACK_IMPORTED_MODULE_6__additional_constants__["a" /* background */].BOTTOM_USELESS_HEIGHT;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Input {
    constructor() {
        this.pressedKeys = {};
        this.addListeners();
    }

    setKey(event, status) {
        let code = event.keyCode,
            key;

        switch (code) {
            case 32:
                key = 'SPACE';
                break;
            case 37:
                key = 'LEFT';
                break;
            case 38:
                key = 'UP';
                break;
            case 39:
                key = 'RIGHT';
                break;
            case 40:
                key = 'DOWN';
                break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }

        this.pressedKeys[key] = status;
    }

    isDown(key) {
        return this.pressedKeys[key.toUpperCase()];
    }

    addListeners() {
        document.addEventListener('keydown', e => this.setKey(e, true));
        document.addEventListener('keyup', e => this.setKey(e, false));
        window.addEventListener('blur', () => this.pressedKeys = {});
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const timerNode = document.querySelector('#timer');
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const START_GAME_TIME = 10999;

class GameTimer {
    constructor() {
        this.instance = null;
        this.time = null;
        this.gameTime = null;
    }

    start() {
        this.gameTime = START_GAME_TIME;
        if (this.instance !== null) {
            this.stop();
        }

        this.time = Date.now();
        timerNode.textContent = '0:10';

        this.instance = setInterval(() => {
            this.gameTime -= Date.now() - this.time;
            this.time = Date.now();
            const tick = Math.floor(this.gameTime / MILLISECONDS_IN_SECOND),
                seconds = tick % SECONDS_IN_MINUTE,
                minutes = Math.floor(tick / SECONDS_IN_MINUTE);

            timerNode.innerHTML = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        }, 100);
    }

    stop() {
        timerNode.textContent = '0:00';
        this.time = null;
        clearInterval(this.instance);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameTimer;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sprite__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__additional_random__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__additional_constants__ = __webpack_require__(11);





class Flower {
    constructor(canvas) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.sprite = new __WEBPACK_IMPORTED_MODULE_0__Sprite__["a" /* default */]('images/common/flower.png',
            [0, 0],
            [36, 50],
            15,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            true,
            504);
        this.position = [Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(this.sprite.size[0], this.canvasWidth - this.sprite.size[0]), // x
            Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__additional_constants__["a" /* background */].TOP_USELESS_HEIGHT, this.canvasHeight - __WEBPACK_IMPORTED_MODULE_2__additional_constants__["a" /* background */].BOTTOM_USELESS_HEIGHT)]; // y
        this.isMove = true;
        this.direction = 'right';
    }

    grow() {
        this.sprite.done = false;
        this.sprite.index = 0;
        this.position = [Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(this.sprite.size[0], this.canvasWidth - this.sprite.size[0]), // x
            Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__additional_constants__["a" /* background */].TOP_USELESS_HEIGHT, this.canvasHeight - __WEBPACK_IMPORTED_MODULE_2__additional_constants__["a" /* background */].BOTTOM_USELESS_HEIGHT)]; // y
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Flower;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sprite__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_Sound__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__additional_constants__ = __webpack_require__(11);





const CUTE_GIRL_HEALTH = 3;
const CUTE_GIRL_SPEED = 200;
const lives = Array.from(document.querySelectorAll('.hearth'));

class CuteGirl {
    constructor() {
        this.sprite = new __WEBPACK_IMPORTED_MODULE_0__Sprite__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].url,
            __WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].walk.position,
            __WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].walk.size,
            __WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].walk.speed,
            __WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].walk.frames);
        this.position = [0, 0];
        this.direction = 'right';
        this.isMove = false;
        this.speed = CUTE_GIRL_SPEED;
        this.health = CUTE_GIRL_HEALTH;
        this.state = __WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].walk.state;
        this.hurtAudio = new __WEBPACK_IMPORTED_MODULE_1__service_Sound__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__additional_constants__["d" /* sounds */].girlHurt);
        this.happyAudio = new __WEBPACK_IMPORTED_MODULE_1__service_Sound__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__additional_constants__["d" /* sounds */].girlHappy);
        this.sadAudio = new __WEBPACK_IMPORTED_MODULE_1__service_Sound__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__additional_constants__["d" /* sounds */].girlSad);
    }

    hurt() {
        this.hurtAudio.play();
        this.health--;
        if (this.health >= 0) {
          lives[this.health].style.display = 'none';
        }
    }

    die() {
        this.sadAudio.play();
        this.isMove = true;
        this._updateState(__WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].die);
    }

    live() {
        this.health = CUTE_GIRL_HEALTH;
        this.isMove = false;
        this.state = __WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].walk.state;
        this._updateState(__WEBPACK_IMPORTED_MODULE_2__additional_constants__["b" /* cuteGirl */].walk);
        lives.forEach(node => node.style.display = 'block');
    }

    happy() {
        this.happyAudio.play();
    }

    _updateState(config) {
        this.sprite.position = config.position;
        this.sprite.size = config.size;
        this.sprite.speed = config.speed;
        this.sprite.frames = config.frames;
        this.sprite.isOnce = config.isOnce;
        this.sprite.lastFrame = config.lastFrame;
        this.state = config.state;
        this.sprite.index = config.index;
        this.sprite.done = config.done;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CuteGirl;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sprite__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__additional_random__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_Sound__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__additional_constants__ = __webpack_require__(11);






const ENEMIES_MAX_WIDTH = 120;
const ENEMIES_MIN_SPEED = 20;
const ENEMIES_MAX_SPEED = 90;
const ENEMIES_MIN_HEALTH = 2;
const ENEMIES_MAX_HEALTH = 7;

class Zombie {
    constructor(canvas, config) {
        this.sprite = new __WEBPACK_IMPORTED_MODULE_0__Sprite__["a" /* default */](config.url,
            config.walk.position,
            config.walk.size,
            config.walk.speed,
            config.walk.frames);
        this.startPosition = [Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(0, 2) ? -ENEMIES_MAX_WIDTH : canvas.width + ENEMIES_MAX_WIDTH,         // x
            Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_3__additional_constants__["a" /* background */].TOP_USELESS_HEIGHT, canvas.height - __WEBPACK_IMPORTED_MODULE_3__additional_constants__["a" /* background */].BOTTOM_USELESS_HEIGHT)];       // y
        this.position = [...this.startPosition];
        this.isMove = true;
        this.direction = 'right';
        this.speed = Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(ENEMIES_MIN_SPEED, ENEMIES_MAX_SPEED);
        this.health = Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(ENEMIES_MIN_HEALTH, ENEMIES_MAX_HEALTH);
        this.target = [];
        this.config = config;
        this.state = config.walk.state;
        this.deathAudio = new __WEBPACK_IMPORTED_MODULE_2__service_Sound__["a" /* default */](__WEBPACK_IMPORTED_MODULE_3__additional_constants__["d" /* sounds */].enemyDeath);
        this.attackAudio = new __WEBPACK_IMPORTED_MODULE_2__service_Sound__["a" /* default */](__WEBPACK_IMPORTED_MODULE_3__additional_constants__["d" /* sounds */].enemyAttack);
    }

    static createRandomZombie(canvas) {
        return new Zombie(canvas, __WEBPACK_IMPORTED_MODULE_3__additional_constants__["e" /* zombies */][Object(__WEBPACK_IMPORTED_MODULE_1__additional_random__["a" /* default */])(0, __WEBPACK_IMPORTED_MODULE_3__additional_constants__["e" /* zombies */].length)]);
    }

    update(targetPosition, timeDifference) {
        if (this.state === 'walk') {
            this.target = targetPosition;
            this.direction = this.position[0] > this.target[0] ? 'left' : 'right';
            this.position[0] = this.position[0] > this.target[0] ?
                this.position[0] - this.speed * timeDifference :
                this.position[0] + this.speed * timeDifference;
            this.position[1] = this.position[1] > this.target[1] ?
                this.position[1] - this.speed * timeDifference :
                this.position[1] + this.speed * timeDifference;
        }
        this.sprite.update(timeDifference);
    }

    walk() {
        this.updateState(this.config.walk);
    }

    die() {
        this.deathAudio.play();
        this.updateState(this.config.die);
        this.deathAudio.audio.addEventListener('ended', () => {
            this.deathAudio.isFree = true;
            this.attackAudio.isFree = true;
      })
    }

    attack() {
        this.attackAudio.play();
        this.updateState(this.config.attack);
    }

    updateState(config) {
        this.sprite.position = config.position;
        this.sprite.size = config.size;
        this.sprite.speed = config.speed;
        this.sprite.frames = config.frames;
        this.sprite.isOnce = config.isOnce;
        this.sprite.lastFrame = config.lastFrame;
        this.state = config.state;
        this.sprite.index = config.index;
        this.sprite.done = config.done;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Zombie;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return zombies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cuteGirl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return images; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return background; });


const zombies = [{
    url: 'images/characters/zombie_1.png',
    walk: {
        position: [0, 0],
        size: [64, 106],
        speed: 6,
        isOnce: false,
        frames: [0, 1, 2, 3, 4, 5],
        state: 'walk',
        done: false,
        index: 0
    },
    attack: {
        position: [0, 212],
        size: [70, 106],
        speed: 20,
        frames: [0, 1, 2, 3, 4, 5],
        isOnce: true,
        lastFrame: 350,
        state: 'attack',
        index: 0,
        done: false,
    },
    die: {
        position: [0, 424],
        size: [106, 106],
        speed: 6,
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
        isOnce: true,
        lastFrame: 742,
        state: 'dead',
        index: 0,
        done: false,
    }
},
    {
        url: 'images/characters/zombie_2.png',
        walk: {
            position: [0, 0],
            size: [68, 96],
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            isOnce: false,
            speed: 6,
            state: 'walk',
            done: false,
            index: 0
        },
        attack: {
            position: [0, 192],
            size: [68, 96],
            speed: 20,
            frames: [0, 1, 2, 3, 4, 5, 6, 7],
            isOnce: true,
            lastFrame: 476,
            state: 'attack',
            index: 0,
            done: false,
        },
        die: {
            position: [0, 384],
            size: [86, 86],
            speed: 6,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            isOnce: true,
            lastFrame: 860,
            state: 'dead',
            index: 0,
            done: false,
        }
    }];

const cuteGirl = {
    url: 'images/characters/cute_girl.png',
    walk: {
        position: [0, 0],
        size: [82, 110],
        frames: [0, 1, 2, 3, 4, 5, 6],
        isOnce: false,
        speed: 10,
        state: 'walk',
        lastFrame: 0,
        done: false,
        index: 0
    },
    die: {
        position: [0, 220],
        size: [110, 115],
        frames: [0, 1, 2, 3, 4, 5, 6],
        isOnce: true,
        speed: 7,
        state: 'dead',
        lastFrame: 660,
        done: false,
        index: 0
    }
};

const sounds = {
    background: 'sounds/forest_sound.mp3',
    enemyAttack: 'sounds/zombie_attack.wav',
    enemyDeath: 'sounds/zombie_death.wav',
    girlHurt: 'sounds/girl_hurt.mp3',
    girlHappy: 'sounds/girl_happy.ogg',
    girlSad: 'sounds/girl_sad.ogg'
};

const images = {
  background: 'images/background.png',
  cuteGirl: 'images/characters/cute_girl.png',
  flower: 'images/common/flower.png',
  zombie1: 'images/characters/zombie_1.png',
  zombie2: 'images/characters/zombie_2.png',
  sword: 'images/common/sword.png',
  swordActive: 'images/common/sword_active.png'
};

const background = {
    TOP_USELESS_HEIGHT: 100,
    BOTTOM_USELESS_HEIGHT: 200
};



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const cachedSounds = [];

class Sound {
  constructor(src) {
    const cashedAudio = cachedSounds.find(sound => sound.src === src && sound.isFree);
    if (cashedAudio) {
      cashedAudio.isFree = false;
      return cashedAudio;
    }
    this.src = src;
    this.isFree = false;
    this.audio = new Audio(src);
    cachedSounds.push(this);
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sound;




/***/ })
/******/ ]);