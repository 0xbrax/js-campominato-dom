let gridContainer = document.getElementById('grid-container');
const gameMode = document.getElementById('game-mode');
const playBtn = document.getElementById('play-btn');

let gridSelection;

playBtn.addEventListener('click', 
function() {
    if (gameMode.value == ''){
        alert('Scegli la difficoltà di gioco.');
    } else {
        gridSelection = gameMode.value;

        gridContainer.innerHTML = '';
    
        for (let gridNumber = 1; gridNumber <= gridSelection; gridNumber++) {
    
            let grid = document.createElement('div');
            grid.append(gridNumber);
            grid.classList.add('grid-main');
            gridContainer.append(grid);
        
            grid.addEventListener('click', 
            function() {
                console.log(gridNumber);
        
                this.classList.toggle('grid-sec');
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
    }
});