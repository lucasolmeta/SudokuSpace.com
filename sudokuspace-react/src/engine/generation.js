export function buildSudoku (){
    let solution = initArray();

    for(let row = 0; row < 9; row++){

        let numsAvailable = [1,2,3,4,5,6,7,8,9];
        let iterations = 0;

        for(let col = 0; col < 9; col++){

            let numPlaced = false;
    
            while(numPlaced == false){

                let i = Math.floor(Math.random() * numsAvailable.length);

                iterations++;

                if (iterations > 160){
                    for(row = 8; row > 0; row--){
                        for(col = 8; col > 0; col--){
                            solution[row][col]=0;
                        }
                    }

                    iterations = 0;
                    numsAvailable = [1,2,3,4,5,6,7,8,9];

                } else if (iterations%80 == 0){
                    for (col = 8; col > 0; col--){
                        solution[row][col]=0;
                    }

                    numsAvailable = [1,2,3,4,5,6,7,8,9];

                } else if (checkValidity(numsAvailable[i], row, col, solution)){

                    solution[row][col] = numsAvailable[i];

                    numsAvailable.splice(i,1);
                    numPlaced = true;
                }
            }
        }
    }

    let puzzle = solution.map(row => row.slice());
    puzzle = removeNums(puzzle);

    return { puzzle, solution };
}

export function initArray(){
    return Array(9).fill(0).map(() => Array(9).fill(0));
}

function removeNums(grid){
    //REDO THIS FUNCTION
    for(let i = 0; i < 40; i++){

        let numRemoved = false;

        while(!numRemoved){
            var row = Math.floor(Math.random() * 9);
            var col = Math.floor(Math.random() * 9);

            if(grid[row][col]!=0){
                grid[row][col]=0;     
                numRemoved = true;      
            }
        }
    }

    return grid;
}

function checkValidity(num, row, col, grid){
    
    for (let r = 0; r < 9; r++){
        if(grid[r][col] == num){
            return false;
        }
    }
    
    for (let c = 0; c < col; c++){
        if(grid[row][c] == num){
            return false;
        }
    }

    let boxRow = Math.floor(row/3);
    let boxCol = Math.floor(col/3);

    for(let r = 3*boxRow; r<3*boxRow+3; r++){
        for(let c = 3*boxCol; c<3*boxCol+3; c++){
            if(grid[r][c]== num){
                return false;
            }
        }
    }

    return true;
}

/*
export let solution = [];
export let puzzle = [];
export let initGeneration = true;

export function setSolution(sol){
    solution = sol;
}

export function setPuzzle(puz){
    puzzle = puz;
}
*/