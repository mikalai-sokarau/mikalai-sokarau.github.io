'use strict';
import Sprite from './Sprite';
import getRandomInt from '../additional/random';
import Sound from '../service/Sound';
import {zombies, sounds, background} from '../additional/constants';

const ENEMIES_MAX_WIDTH = 120;
const ENEMIES_MIN_SPEED = 20;
const ENEMIES_MAX_SPEED = 90;
const ENEMIES_MIN_HEALTH = 2;
const ENEMIES_MAX_HEALTH = 7;

export default class Zombie {
    constructor(canvas, config) {
        this.sprite = new Sprite(config.url,
            config.walk.position,
            config.walk.size,
            config.walk.speed,
            config.walk.frames);
        this.startPosition = [getRandomInt(0, 2) ? -ENEMIES_MAX_WIDTH : canvas.width + ENEMIES_MAX_WIDTH,         // x
            getRandomInt(background.TOP_USELESS_HEIGHT, canvas.height - background.BOTTOM_USELESS_HEIGHT)];       // y
        this.position = [...this.startPosition];
        this.isMove = true;
        this.direction = 'right';
        this.speed = getRandomInt(ENEMIES_MIN_SPEED, ENEMIES_MAX_SPEED);
        this.health = getRandomInt(ENEMIES_MIN_HEALTH, ENEMIES_MAX_HEALTH);
        this.target = [];
        this.config = config;
        this.state = config.walk.state;
        this.deathAudio = new Sound(sounds.enemyDeath);
        this.attackAudio = new Sound(sounds.enemyAttack);
    }

    static createRandomZombie(canvas) {
        return new Zombie(canvas, zombies[getRandomInt(0, zombies.length)]);
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
