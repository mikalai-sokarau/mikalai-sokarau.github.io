'use strict';

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

export {zombies, cuteGirl, sounds, images, background};