'use strict';
import Sprite from './Sprite';
import getRandomInt from '../additional/random';
import {background} from '../additional/constants';

export default class Flower {
    constructor(canvas) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.sprite = new Sprite('images/common/flower.png',
            [0, 0],
            [36, 50],
            15,
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            true,
            504);
        this.position = [getRandomInt(this.sprite.size[0], this.canvasWidth - this.sprite.size[0]), // x
            getRandomInt(background.TOP_USELESS_HEIGHT, this.canvasHeight - background.BOTTOM_USELESS_HEIGHT)]; // y
        this.isMove = true;
        this.direction = 'right';
    }

    grow() {
        this.sprite.done = false;
        this.sprite.index = 0;
        this.position = [getRandomInt(this.sprite.size[0], this.canvasWidth - this.sprite.size[0]), // x
            getRandomInt(background.TOP_USELESS_HEIGHT, this.canvasHeight - background.BOTTOM_USELESS_HEIGHT)]; // y
    }
}
