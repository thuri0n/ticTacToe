'use strict';

class TicTacToe {
    constructor (el) {
        this.el = document.getElementById(el);
        this.init();
        this.state = {};
    }

    init () {
        for (let i = 0; i < 3; i++) {
            this.el.innerHTML += `<div class="row" id="row_${(i + 1)}"></div>`;
            for (let j = 0; j < 3; j++) {
                document.getElementById(`row_${(i + 1)}`).innerHTML += `<div class="cell" id="cell_${(i + 1)}">${(i + 1)}</div>`;
            }
        }
    }
}

const ticTacToe = new TicTacToe('app');

