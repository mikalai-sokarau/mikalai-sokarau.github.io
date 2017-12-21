'use strict';
const cachedSounds = [];

export default class Sound {
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

