let gridContainer = document.getElementById('grid-container');
const gameMode = document.getElementById('game-mode');
const playBtn = document.getElementById('play-btn');

let gridSelection;

let randomUniqueNumberList = [];
const maxEndElement = 16;
let gridArrrayList = [];

playBtn.addEventListener('click', 
function() {
    if (gameMode.value == ''){
        alert('Scegli la difficoltà di gioco.');
    } else {
        randomUniqueNumberList = [];
        gridContainer.innerHTML = '';

        gridSelection = gameMode.value;

        randomUniqueNumber(maxEndElement, 1, gridSelection);
    
        for (let gridNumber = 1; gridNumber <= gridSelection; gridNumber++) {
    
            let grid = document.createElement('div');
            grid.append(gridNumber);
            grid.classList.add('grid-main');
            gridContainer.append(grid);

            gridArrrayList.push(grid);
        
            grid.addEventListener('click', 
            function() {
                console.log(gridNumber)

                let toogleVerify = false;

                this.classList.toggle('grid-sec');

                for (let i = 0; i < randomUniqueNumberList.length; i++) {
                    if (gridNumber == randomUniqueNumberList[i]) {

                        let arrayVerify = false;
                        
                        for (let n = 0; n < gridArrrayList.length; n++) {

                            /*
                            if (gridArrrayList.includes(randomUniqueNumberList[i])) {
                                arrayVerify = true;
                            }
                            while (arrayVerify == true) {
                                gridArrrayList[n].classList.add('grid-end');
                        
                                if (!gridArrrayList.includes(randomUniqueNumberList[i])) {
                                    arrayVerify = false;
                                }
                            }
                            */

                            
                            if (n == (randomUniqueNumberList[i] - 1)) {
                                //arrayVerify = true;

                                gridArrrayList[n].classList.add('grid-end');

                                console.log(arrayVerify)
                                console.log(n)
                            }
                        }

                        toogleVerify = true;
                    }
                }

                
                
                

                if (toogleVerify == true) {
                    alert('Hai perso.');
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