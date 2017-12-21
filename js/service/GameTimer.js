'use strict';

const timerNode = document.querySelector('#timer');
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const START_GAME_TIME = 10999;

export default class GameTimer {
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
