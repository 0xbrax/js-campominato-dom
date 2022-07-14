let gridContainer = document.getElementById('grid-container');
const gameMode = document.getElementById('game-mode');
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
let maxResult = [0];
let resultVerify = false;

playBtn.addEventListener('click', 
function() {
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

        gridSelection = gameMode.value;

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
                    for (let n = 0; n < gridArrrayList.length; n++) {
                        
                        if (n == (randomUniqueNumberList[i] - 1)) {
                            gridArrrayList[n].classList.add('grid-no-show');
                        }
                    }
                    toogleVerify = true;
                }
            }

            grid.addEventListener('click', 
            function() {
                console.log(gridNumber)

                this.classList.toggle('grid-sec');

                if (grid.classList.contains('grid-sec')) {
                    clickCounter++;
                } else if (!grid.classList.contains('grid-sec')) {
                    clickCounter--;
                }

                counterLive.innerHTML = clickCounter;

                if (toogleVerify == true) {
                    for (let n = 0; n < gridArrrayList.length; n++) {
                        if (gridArrrayList[n].classList.contains('grid-no-show')) {
                            gridArrrayList[n].classList.add('grid-end');
                        }
                    }

                    counterLive.innerHTML = (clickCounter - 1);

                    setTimeout(function() {
                        alert('Hai perso, gioca ancora.');

                        counter.innerHTML += `<p>${clickCounter - 1}</p>`;
                        counterLive.innerHTML = '';
                        counterResult.push(clickCounter - 1);
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

        console.log(randomUniqueNumberList)
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