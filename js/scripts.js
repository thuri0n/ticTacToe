'use strict';

class TicTacToe {
    constructor (rootSelector) {
        this.root = document.getElementById(rootSelector);
        this.currentPlayer = '';
        this.lenghtHorizontal = 3;
        this.lenghtVertical = 3;
        this.choosePlayer();
    }

    choosePlayer (preTemplate = '') {
        this.templateChoosePlayer = `${preTemplate}<div class="choose-players">
                                       <div class="title">Выберите игрока</div>
                                       <div class="players">
                                         <a href="#" class="player" data-player="x">x</a>
                                         <a href="#" class="player" data-player="o">o</a>
                                       </div>
                                     </div>`;

        this.renderTemplate(this.templateChoosePlayer);

        let players =  document.querySelectorAll('.player');

        for(let i = 0; i < players.length; i++) {
            players[i].addEventListener('click', (e) => {
                this.currentPlayer = e.currentTarget.dataset.player;
                this.initGame();
            })
        }

        return this.virtualBoard = [new Array(this.lenghtHorizontal), new Array(this.lenghtHorizontal), new Array(this.lenghtHorizontal)];
    }

    renderTemplate (string) {
        this.root.innerHTML = string;
    }

    initGame () {
        this.templateInitGame = '';
        for (let i = 0; i < 3; i++) {
            this.templateInitGame += `<div class="row" id="row_${i}">`;
            for (let j = 0; j < 3; j++) {
                this.templateInitGame += `<div class="cell" id="matrix_${i + '-' + j}"></div>`;
            }
            this.templateInitGame += `</div>`;
        }

        this.renderTemplate(this.templateInitGame);

        let link = document.querySelectorAll('.cell');

        for (let i = 0; i < link.length; i++) {
            link[i].addEventListener('click', (e) => {
                if(!e.currentTarget.textContent) {
                    this.virtualBoard[e.currentTarget.id.substr(7, 1)][e.currentTarget.id.substr(9, 1)] = this.currentPlayer;
                    e.currentTarget.textContent = this.currentPlayer;
                    this.checkWinner();
                    this.switchPlayer();
                }
            });
        }

    }

    switchPlayer () {
        if(this.currentPlayer === 'x') {
            this.currentPlayer = 'o'
        } else {
            this.currentPlayer = 'x'
        }
    }

    checkWinner () {
        const repeatString = (string, count) => {
            let concat = '';
            for(let k = 0; k <= count - 1; k++) {
                concat += string;
            }

            return concat;
        };

        const templateWinner = (winner) => {
            let winnerTemplate = `<div class="winner-template">${winner}</div>`;
            return this.choosePlayer(winnerTemplate);
        };

        const whoHasWon = (result) => {
            if(result === repeatString('x', this.lenghtVertical)) {
                return templateWinner('Победитель x');
            } else if (result === repeatString('o', this.lenghtVertical)) {
                return templateWinner('Победитель o');
            }
        };


        const winHorizontal = () => {
            for(let indexRow = 0; indexRow <= this.lenghtHorizontal - 1; indexRow++) {
                let row = this.virtualBoard[indexRow];
                let result = '';
                for(let indexCell = 0; indexCell <= row.length - 1; indexCell++) {
                    result += this.virtualBoard[indexRow][indexCell];
                }

                whoHasWon(result);
            }
        };

        const winVertical = () => {
            for(let indexRow = 0; indexRow <= this.lenghtVertical - 1; indexRow++) {
                let row = this.virtualBoard[indexRow];
                let result = '';
                for(let indexCell = 0; indexCell <= row.length - 1; indexCell++) {
                    result += this.virtualBoard[indexCell][indexRow];
                }

                whoHasWon(result);
            }
        };

        const winDiagonal = () => {
            const normalDiagonal = () => {
                let result = '';

                for(let indexRow = 0; indexRow <= this.lenghtVertical - 1; indexRow++) {
                    result += this.virtualBoard[indexRow][indexRow]
                }

                whoHasWon(result);
            };

            const revertDiagonal = () => {
                let result = '';

                let currentBoard = this.virtualBoard,
                    mirrorBoard = currentBoard.reverse();
                for(let indexRow = 0; indexRow <= this.lenghtVertical - 1; indexRow++) {
                    result += mirrorBoard[indexRow][indexRow]
                }

                whoHasWon(result);
            };

            normalDiagonal();
            revertDiagonal();
        };

        const draw = () => {
            let result = '';
            for(let indexRow = 0; indexRow <= this.lenghtHorizontal- 1; indexRow++) {
                for(let indexCell = 0; indexCell <= this.lenghtVertical - 1; indexCell++) {
                    if(this.virtualBoard[indexRow][indexCell]) {
                        result += this.virtualBoard[indexRow][indexCell];
                    }
                }
            }

            if(result.length === 9) {
                return templateWinner('Ничья');
            }
        };

        winHorizontal();
        winVertical();
        winDiagonal();
        draw();
    }
}

const ticTacToe = new TicTacToe('app');
