'use strict';
import Sprite from './Sprite';
import Sound from '../service/Sound';
import {cuteGirl, sounds} from '../additional/constants';

const CUTE_GIRL_HEALTH = 3;
const CUTE_GIRL_SPEED = 200;
const lives = Array.from(document.querySelectorAll('.hearth'));

export default class CuteGirl {
    constructor() {
        this.sprite = new Sprite(cuteGirl.url,
            cuteGirl.walk.position,
            cuteGirl.walk.size,
            cuteGirl.walk.speed,
            cuteGirl.walk.frames);
        this.position = [0, 0];
        this.direction = 'right';
        this.isMove = false;
        this.speed = CUTE_GIRL_SPEED;
        this.health = CUTE_GIRL_HEALTH;
        this.state = cuteGirl.walk.state;
        this.hurtAudio = new Sound(sounds.girlHurt);
        this.happyAudio = new Sound(sounds.girlHappy);
        this.sadAudio = new Sound(sounds.girlSad);
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
        this._updateState(cuteGirl.die);
    }

    live() {
        this.health = CUTE_GIRL_HEALTH;
        this.isMove = false;
        this.state = cuteGirl.walk.state;
        this._updateState(cuteGirl.walk);
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