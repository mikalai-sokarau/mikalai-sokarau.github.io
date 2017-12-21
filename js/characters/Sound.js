'use strict';

export default class Sound {
    constructor(src) {
        this.audio = document.createElement('audio');
        this.audio.src = src;
        this.audio.setAttribute('preload', 'auto');
        this.audio.setAttribute('controls', 'none');
        this.audio.style.display = 'none';
        document.body.appendChild(this.audio);
    }

    play() {
        this.audio.play();
    }

    stop() {
        this.audio.pause();
    }
}
