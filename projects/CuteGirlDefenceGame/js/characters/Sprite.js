'use strict';

export default class Sprite {
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
