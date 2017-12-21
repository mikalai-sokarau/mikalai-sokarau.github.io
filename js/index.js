'use strict';
import Game from './Game';

const game = new Game();
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