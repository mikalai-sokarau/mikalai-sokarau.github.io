'use strict';

export default function getRandomInt(from, to) {
    return Math.floor(Math.random() * (from - to)) + to;
}