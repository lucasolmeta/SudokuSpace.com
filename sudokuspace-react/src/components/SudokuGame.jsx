import { useState } from 'react';
import { buildSudoku, initArray } from '../engine/generation.js';
import Board from './Board.jsx';

const emptyGrid = initArray();

export default function SudokuGame() {
  //current visible board, calling setGrid redraws the 81 cells
  //setGrid generated automatically by React to update grid

  const [grid, setGrid] = useState(initArray());

  //correct completed board, calling setSolution doesn't affect rendering directly

  const [solution, setSolution] = useState(initArray());

  //marks which cells are fixed at start, used to disable editing
  const [given, setGiven] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );

  //marks which cells are empty
  const emptyStatus = () => Array.from({ length: 9 }, () => Array(9).fill(''));
  const [status, setStatus] = useState(emptyStatus());

  //creates new sudoku state
  function generate() {
    const { puzzle, solution } = buildSudoku();
    setGrid(puzzle);
    setSolution(solution);
    setGiven(puzzle.map(row => row.map(v => v !== 0)));
  }

  //checks sudoku, recoloring numbers and calling alert if correct
  function check() {
    const next = status.map(row => row.slice());
    let solved = true;
  
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (given[r][c]) continue;
  
        if (grid[r][c] === 0) {
          solved = false;
          continue;
        }
  
        if (grid[r][c] === solution[r][c]) next[r][c] = 'correct';
        else {
          next[r][c] = 'wrong';
          solved = false;
        }
      }
    }
  
    setStatus(next);
  
    if (solved) alert('Congratulations! You solved the Sudoku 🎉!');
  }

  //called upon change in cell value, limits inputs to only numbers and resets status
  function onChangeCell(r, c, raw) {
    const v = raw.replace(/[^1-9]/g, '');
    setGrid(g => {
      const next = g.map(row => row.slice());
      next[r][c] = v === '' ? 0 : Number(v);
      return next;
    });
  
    setStatus(s => {
      const next = s.map(row => row.slice());
      next[r][c] = '';
      return next;
    });
  }

  //returns board component with generate and check buttons
  return (
    <>
      <Board grid={grid} given={given} status={status} onChangeCell={onChangeCell} />
      
      <div className="container">
        <button onClick={generate}>Generate</button>
        <button onClick={check}>Check</button>
      </div>
    </>
  );
}
