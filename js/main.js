let gridContainer = document.getElementById('grid-container');
let gameMode = document.getElementById('game-mode');
const playBtn = document.getElementById('play-btn');
const counter = document.getElementById('counter');

let gridSelection;
let randomUniqueNumberList = [];
const maxEndElement = 16;
let gridArrrayList = [];

let winTxt = document.getElementById('win-text');
let winImg = document.getElementById('you-win');
let loseTxt = document.getElementById('lose-text');
let loseImg = document.getElementById('you-lose');
let counterLive = document.getElementById('result');

const counterResult = [];
let maxResult = [];
let resultVerify = false;

playBtn.addEventListener('click', 
function() {
    switch (parseInt(gameMode.value)) {
        case 1:
        default:
            gridSelection = 100;
            break;
        case 2:
            gridSelection = 81;
            break;
        case 3:
            gridSelection = 64;
            break;
        case 4:
            gridSelection = 49;
            break;
    }

    if (gameMode.value == ''){
        alert('Scegli la difficoltà di gioco.');
    } else {
        randomUniqueNumberList = [];
        gridArrrayList = [];
        gridContainer.innerHTML = '';
        let clickCounter = 0;
        winTxt.style.display = 'none';
        winImg.style.display = 'none';
        loseTxt.style.display = 'none';
        loseImg.style.display = 'none';

        randomUniqueNumber(maxEndElement, 1, gridSelection);
    
        for (let gridNumber = 1; gridNumber <= gridSelection; gridNumber++) {
    
            let grid = document.createElement('div');
            grid.append(gridNumber);
            grid.classList.add('grid-main');
            gridContainer.append(grid);

            gridArrrayList.push(grid);

            let toogleVerify = false;

            for (let i = 0; i < randomUniqueNumberList.length; i++) {
                if (gridNumber == randomUniqueNumberList[i]) {
                    toogleVerify = true;
                }
            }

            grid.addEventListener('click', 
            function() {
                this.classList.toggle('grid-sec');

                let multiplier = 0;
                if (grid.classList.contains('grid-sec')) {
                    clickCounter++;
                    if (gameMode.value == '1') {
                        multiplier = clickCounter * 1;
                    } else if (gameMode.value == '2') {
                        multiplier = clickCounter * 2;
                    } else if (gameMode.value == '3') {
                        multiplier = clickCounter * 3;
                    } else if (gameMode.value == '4') {
                        multiplier = clickCounter * 5;
                    }
                } else if (!grid.classList.contains('grid-sec')) {
                    clickCounter--;
                    if (gameMode.value == '1') {
                        multiplier = clickCounter * 1;
                    } else if (gameMode.value == '2') {
                        multiplier = clickCounter * 2;
                    } else if (gameMode.value == '3') {
                        multiplier = clickCounter * 3;
                    } else if (gameMode.value == '4') {
                        multiplier = clickCounter * 5;
                    }
                }
                counterLive.innerHTML = multiplier;

                if (toogleVerify == true) {
                    for (let i = 0; i < randomUniqueNumberList.length; i++) {
                        for (let n = 0; n < gridArrrayList.length; n++) {
                            gridArrrayList[randomUniqueNumberList[i] - 1].classList.add('grid-end');
                        }
                    }

                    let counterResultMod;
                    if (gameMode.value == '1') {
                        counterResultMod = multiplier - 1;
                    } else if (gameMode.value == '2') {
                        counterResultMod = multiplier - 2;
                    } else if (gameMode.value == '3') {
                        counterResultMod = multiplier - 3;
                    } else if (gameMode.value == '4') {
                        counterResultMod = multiplier - 5;
                    }
                    counterLive.innerHTML = `<p>${counterResultMod}</p>`;

                    setTimeout(function() {
                        alert('Gioca ancora.');

                        counter.innerHTML += `<p>${counterResultMod}</p>`;
                        counterLive.innerHTML = '';
                        counterResult.push(counterResultMod);
                        gameMode.value = '';
                        gridContainer.innerHTML = `<p>Scegli la difficoltà e gioca!</p>`;

                        for (let z = 0; z < counterResult.length; z++) {
                            if (counterResult[z] > maxResult) {
                                maxResult = counterResult[z];
                                resultVerify = true;
                            } else if (counterResult[z] <= maxResult) {
                                resultVerify = false;
                            }
                        }

                        if (resultVerify == true) {
                            winTxt.style.display = 'block';
                            winImg.style.display = 'block';
                        } else if ((resultVerify == false)) {
                            loseTxt.style.display = 'block';
                            loseImg.style.display = 'block';
                        }
                    }, 1);
                }
            });
        }
    
        let gridMain = document.querySelectorAll('.grid-main');
        const squareRoot = Math.sqrt(gridSelection);
    
        const gridSizePerc = gridContainer.offsetHeight / squareRoot;
        const gridSizeFinal = ((gridSizePerc * 100) / gridContainer.offsetHeight) + '%';
    
        for (let gridList = 0; gridList < gridMain.length; gridList++) {
            gridMain[gridList].style.width = gridSizeFinal;
            gridMain[gridList].style.height = gridSizeFinal;
        }

        //console.log(randomUniqueNumberList)
    }
});



function randomUniqueNumber(maxEndElement, min, max) {
    let numberEndGame;
    let numberVerify = false;

    for (let list = 0; list < maxEndElement; list++) {
        numberEndGame = randomNumber(min, max);
        
        if (randomUniqueNumberList.includes(numberEndGame)) {
            numberVerify = true;
        }
        
        while (numberVerify == true) {
            numberEndGame = randomNumber(min, max);

            if (!randomUniqueNumberList.includes(numberEndGame)) {
                numberVerify = false;
            }
        }
        
        randomUniqueNumberList.push(numberEndGame);
        }
}

function randomNumber(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1) + min);

    return number;
}